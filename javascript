// 植物数据 - 每种植物有3句赞美
const plantsData = {
    trees: [
        {
            name: "Oak Tree",
            icon: "fa-tree",
            praises: [
                "You stand tall through every season, a symbol of resilience.",
                "Your branches reach for the sky while your roots hold the earth.",
                "In your shade, the world finds rest and quiet."
            ]
        },
        {
            name: "Pine Tree",
            icon: "fa-tree",
            praises: [
                "Evergreen and enduring, you wear your needles like a crown.",
                "Your scent carries the memory of forests and fresh beginnings.",
                "Through winter snows, you remain steadfast and strong."
            ]
        },
        {
            name: "Cherry Blossom",
            icon: "fa-tree",
            praises: [
                "Your fleeting beauty reminds us to cherish each moment.",
                "Like pink snow, your petals dance in the spring breeze.",
                "You teach us that endings can be as beautiful as beginnings."
            ]
        }
    ],
    plants: [
        {
            name: "Fern",
            icon: "fa-leaf",
            praises: [
                "You thrive in the quiet corners, bringing life to every space.",
                "Your delicate fronds unfold like nature's own lace.",
                "Ancient and graceful, you connect us to primeval forests."
            ]
        },
        {
            name: "Cactus",
            icon: "fa-cactus",
            praises: [
                "You flourish where others cannot, a lesson in adaptation.",
                "Your spines protect a heart full of precious water.",
                "In the harshest conditions, you find a way to bloom."
            ]
        },
        {
            name: "Aloe Vera",
            icon: "fa-leaf",
            praises: [
                "Healer and soother, you offer comfort with every leaf.",
                "Your quiet presence in a pot brings wellness and calm.",
                "Simple, useful, and always generous with your gifts."
            ]
        }
    ],
    flowers: [
        {
            name: "Rose",
            icon: "fa-seedling",
            praises: [
                "Your beauty is a fleeting gift that reminds us to cherish each moment.",
                "Even with thorns, you offer your beauty to the world.",
                "Symbol of love, you speak a language all hearts understand."
            ]
        },
        {
            name: "Sunflower",
            icon: "fa-sun",
            praises: [
                "You follow the light, teaching us to always face hope.",
                "Your golden face brings sunshine even on cloudy days.",
                "Tall and bright, you turn fields into seas of gold."
            ]
        },
        {
            name: "Tulip",
            icon: "fa-spa",
            praises: [
                "Elegant and simple, your cup holds morning dew like jewels.",
                "You color the spring with your cheerful, upright blooms.",
                "From a humble bulb, you rise to greet the sun."
            ]
        }
    ]
};

// 游戏状态
let collectedPraises = new Set();
let totalClicks = 0;

// DOM元素
const plantsGrids = {
    trees: document.querySelector('.plants-grid:nth-child(1)'),
    plants: document.querySelector('.plants-grid:nth-child(2)'),
    flowers: document.querySelector('.plants-grid:nth-child(3)')
};

const praiseText = document.getElementById('praise-text');
const praiseCount = document.getElementById('praise-count');

// 初始化植物网格
function initializePlants() {
    // 创建树木
    plantsData.trees.forEach((tree, index) => {
        const plantElement = createPlantElement(tree, 'trees', index);
        plantsGrids.trees.appendChild(plantElement);
    });
    
    // 创建植物
    plantsData.plants.forEach((plant, index) => {
        const plantElement = createPlantElement(plant, 'plants', index);
        plantsGrids.plants.appendChild(plantElement);
    });
    
    // 创建花朵
    plantsData.flowers.forEach((flower, index) => {
        const plantElement = createPlantElement(flower, 'flowers', index);
        plantsGrids.flowers.appendChild(plantElement);
    });
}

// 创建植物元素
function createPlantElement(plant, category, index) {
    const div = document.createElement('div');
    div.className = 'plant-item';
    div.dataset.category = category;
    div.dataset.index = index;
    
    div.innerHTML = `
        <div class="plant-icon">
            <i class="fas ${plant.icon}"></i>
        </div>
        <div class="plant-name">${plant.name}</div>
    `;
    
    // 添加点击事件
    div.addEventListener('click', () => handlePlantClick(plant, category, index, div));
    
    return div;
}

// 处理植物点击
function handlePlantClick(plant, category, index, element) {
    // 随机选择一句赞美
    const praiseIndex = Math.floor(Math.random() * plant.praises.length);
    const praise = plant.praises[praiseIndex];
    
    // 显示赞美
    praiseText.style.opacity = '0';
    setTimeout(() => {
        praiseText.textContent = `"${praise}"`;
        praiseText.style.opacity = '1';
    }, 200);
    
    // 创建气泡
    createBubbles(element);
    
    // 更新统计
    const praiseKey = `${category}-${index}-${praiseIndex}`;
    if (!collectedPraises.has(praiseKey)) {
        collectedPraises.add(praiseKey);
        praiseCount.textContent = collectedPraises.size;
    }
    
    // 添加点击动画
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
    
    // 增加总点击次数
    totalClicks++;
    
    // 每点击5次改变一次副标题
    if (totalClicks % 5 === 0) {
        const subtitles = [
            "Keep praising plants to release more oxygen!",
            "Each praise makes the world a little greener.",
            "Plants thrive on your kind words!",
            "Nature smiles with every click.",
            "You're becoming a true plant appreciator!"
        ];
        const randomSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
        document.querySelector('.subtitle').textContent = randomSubtitle;
    }
}

// 创建气泡效果
function createBubbles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 创建3-5个气泡
    const bubbleCount = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = 'O₂';
        
        // 随机大小和起始位置
        const size = 20 + Math.random() * 20;
        const startX = centerX - 30 + Math.random() * 60;
        const startY = centerY - 20 + Math.random() * 40;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${startX}px`;
        bubble.style.top = `${startY}px`;
        bubble.style.fontSize = `${size / 3}px`;
        
        // 添加到页面
        document.body.appendChild(bubble);
        
        // 动画结束后移除气泡
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePlants);

// 添加一些初始交互提示
setTimeout(() => {
    if (collectedPraises.size === 0) {
        praiseText.innerHTML = '<span style="color: var(--primary-green);">Click any plant to begin!</span>';
    }
}, 1000);
