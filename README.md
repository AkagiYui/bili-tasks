# 【哔哩哔哩】一些任务 - 油猴脚本

这是一个基于 Preact 构建的油猴脚本项目，为哔哩哔哩收藏夹页面添加了悬浮按钮和任务面板功能。

## ✨ 功能特性

- 🎯 **悬浮按钮**: 页面右下角的圆形悬浮按钮，不影响原页面布局
- 🎨 **全屏模态框**: 点击悬浮按钮后显示的全屏任务面板
- 🎭 **平滑动画**: 模态框支持向下滑动隐藏的动画效果
- 📱 **响应式设计**: 适配桌面和移动设备
- 🛡️ **样式隔离**: 避免与宿主页面样式冲突
- 🎪 **示例功能**: 包含一个计数器作为功能演示

## 🛠️ 技术栈

- **框架**: Preact 10.26.9
- **构建工具**: Vite 6.3.5 + vite-plugin-monkey 5.0.9
- **语言**: TypeScript 5.8.3
- **包管理器**: pnpm
- **目标环境**: 哔哩哔哩收藏夹页面

## 🚀 快速开始

### 开发环境设置

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd bili-tasks
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   ```

4. **构建生产版本**
   ```bash
   pnpm build
   ```

### 安装和使用

1. **安装油猴脚本管理器**
   - 推荐使用 [Tampermonkey](https://www.tampermonkey.net/)

2. **安装脚本**
   - 构建项目后，在 `dist/bili-tasks.user.js` 找到生成的脚本
   - 在 Tampermonkey 中创建新脚本，复制粘贴内容
   - 或者直接导入 `.user.js` 文件

3. **使用脚本**
   - 访问哔哩哔哩收藏夹页面 (`https://space.bilibili.com/*/favlist*`)
   - 在页面右下角会出现悬浮按钮
   - 点击按钮打开任务面板
   - 点击面板右上角的向下箭头关闭面板

## 📁 项目结构

```
bili-tasks/
├── src/
│   ├── components/          # 组件目录
│   │   ├── FloatingButton.tsx    # 悬浮按钮组件
│   │   ├── FloatingButton.css
│   │   ├── Modal.tsx            # 模态框组件
│   │   ├── Modal.css
│   │   ├── TaskPanel.tsx        # 任务面板组件
│   │   └── TaskPanel.css
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts
│   ├── app.tsx             # 主应用组件
│   ├── app.css
│   └── main.tsx            # 入口文件
├── dist/                   # 构建输出目录
│   └── bili-tasks.user.js  # 生成的油猴脚本
├── test-page.html          # 测试页面
├── vite.config.ts          # Vite 配置
├── package.json
└── README.md
```

## 🎨 组件说明

### FloatingButton 悬浮按钮
- 固定定位在页面右下角
- 圆形设计，带有渐变背景和阴影效果
- 悬停时有缩放和位移动画
- 高 z-index 确保在最上层显示

### Modal 模态框
- 全屏覆盖，半透明背景遮罩
- 支持向下滑动隐藏动画
- 右上角带有向下箭头的关闭按钮
- 点击背景区域也可关闭

### TaskPanel 任务面板
- 当前包含一个示例计数器
- 未来可扩展更多功能
- 响应式设计，适配不同屏幕尺寸

## 🔧 开发指南

### 添加新功能

1. 在 `src/components/` 目录下创建新组件
2. 在 `src/types/index.ts` 中添加相应的类型定义
3. 在 `TaskPanel.tsx` 中集成新功能
4. 更新样式文件

### 构建配置

项目使用 `vite-plugin-monkey` 插件来构建油猴脚本：

- 入口文件: `src/main.tsx`
- 匹配页面: `https://space.bilibili.com/*/favlist*`
- 外部依赖: Preact 通过 CDN 加载

### 样式隔离

为了避免与宿主页面样式冲突：

- 所有组件都使用独立的 CSS 文件
- 重要样式使用高特异性选择器
- 关键元素设置了高 z-index 值
- 使用 `box-sizing: border-box` 确保布局一致性

## 🧪 测试

项目包含一个测试页面 `test-page.html`，可以在本地测试脚本功能：

1. 构建项目: `pnpm build`
2. 安装生成的脚本到油猴管理器
3. 打开 `test-page.html` 测试功能

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请访问 [GitHub Issues](https://github.com/AkagiYui/UserScript/issues)
