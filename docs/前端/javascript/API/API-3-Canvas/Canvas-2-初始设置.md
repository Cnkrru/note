## 简介
要先拿到画布和画笔，上色，然后开始画画
## 详细
1. id选择器绑定画布
2. getContext()子方法拿到画笔
3. fillstyle子属性上色
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #canvas {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#333333';
    </script>
</body>
</html>
```