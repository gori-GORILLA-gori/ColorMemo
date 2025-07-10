window.addEventListener('pywebviewready', () => {
    const colorGrid = document.getElementById('color-grid');
    const form = document.getElementById('add-color-form');
    const colorPicker = document.getElementById('color-picker');
    const colorHexInput = document.getElementById('color-hex');

    // --- 初期表示 ---
    loadColors();

    // --- イベントリスナー ---

    // カラーピッカーとテキスト入力の同期
    colorPicker.addEventListener('input', (e) => {
        colorHexInput.value = e.target.value;
    });
    colorHexInput.addEventListener('input', (e) => {
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e.target.value)) {
            colorPicker.value = e.target.value;
        }
    });

    // フォーム送信（色追加）
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newColor = {
            name: document.getElementById('color-name').value,
            hex: document.getElementById('color-hex').value,
            description: document.getElementById('color-description').value
        };

        // PythonのaddColor関数を呼び出す
        window.pywebview.api.addColor(newColor).then(response => {
            if (response.success) {
                // 成功したら、リストを再読み込みしてUIを更新
                loadColors();
                form.reset();
                colorPicker.value = '#ffffff';
                colorHexInput.value = '#ffffff';
            } else {
                alert(`エラー: ${response.message}`);
            }
        });
    });

    // クリックイベント（イベント委譲）
    colorGrid.addEventListener('click', (e) => {
        const target = e.target;

        // 削除ボタンが押された場合
        if (target.classList.contains('delete-btn')) {
            if (confirm('この色を本当に削除しますか？')) {
                const index = parseInt(target.dataset.index, 10);
                window.pywebview.api.deleteColor(index).then(response => {
                    if (response.success) {
                        loadColors(); // 成功したらリストを再読み込み
                    } else {
                        alert(`エラー: ${response.message}`);
                    }
                });
            }
        // カラーコードが押された場合
        } else if (target.classList.contains('hex-code')) {
            const code = target.textContent;
            window.pywebview.api.copyToClipboard(code);
            target.textContent = 'Copied!';
            setTimeout(() => { target.textContent = code; }, 1000);
        }
    });

    // --- 関数定義 ---

    // Pythonから色リストを取得して描画するメイン関数
    function loadColors() {
        window.pywebview.api.getColors().then(colors => {
            renderColors(colors || []);
        });
    }

    // 色の配列からHTMLを組み立てて描画
    function renderColors(colors) {
        colorGrid.innerHTML = '';
        if (colors.length === 0) {
            colorGrid.innerHTML = '<p>登録されている色がありません。</p>';
            return;
        }
        colors.forEach((color, index) => {
            const card = createColorCard(color, index);
            colorGrid.appendChild(card);
        });
    }

    // 単一のカラーカード要素を作成
    function createColorCard(color, index) {
        const card = document.createElement('div');
        card.className = 'color-card';
        card.innerHTML = `
            <button class="delete-btn" data-index="${index}" title="削除する">×</button>
            <div class="color-preview" style="background-color: ${color.hex};"></div>
            <div class="color-info">
                <h2>${escapeHTML(color.name)}</h2>
                <p>${escapeHTML(color.description)}</p>
                <div class="hex-code-container">
                    <span class="hex-code" title="クリックしてコピー">${color.hex}</span>
                </div>
            </div>
        `;
        return card;
    }

    // サニタイズ用
    function escapeHTML(str) {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }
});
