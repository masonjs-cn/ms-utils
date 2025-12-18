# 开发指南

本文档介绍如何在本地开发和构建 `@masonjs/utils` 项目。

## 环境准备

### 必需环境

- **Node.js**: >= 14.0.0
- **包管理器**: pnpm >= 7.0.0 (推荐) 或 npm/yarn

### 推荐工具

- **IDE**: VS Code (推荐安装 ESLint、Prettier 插件)
- **Git**: 最新版本
- **浏览器**: Chrome、Firefox、Safari、Edge (用于测试浏览器兼容性)

## 项目结构

```
ms-utils/
├── .husky/              # Git hooks 配置
│   ├── commit-msg       # 提交信息检查
│   └── pre-commit       # 提交前检查
├── src/                 # 源代码目录
│   ├── __test__/       # 测试文件
│   ├── constant/       # 常量定义
│   │   ├── regexp.ts   # 正则表达式
│   │   ├── types.ts    # 类型定义和枚举
│   │   └── variables.ts # 变量常量
│   ├── func/           # 工具函数
│   ├── validator/      # 验证器函数
│   └── index.ts        # 入口文件，导出所有公共 API
├── lib/                # 编译输出目录（构建后生成，不提交到 Git）
├── doc/                # 文档目录
├── jest.config.mjs     # Jest 测试配置
├── rollup.config.js    # Rollup 构建配置
├── tsconfig.json       # TypeScript 配置
├── .eslintrc.js        # ESLint 配置
├── .prettierrc.js      # Prettier 配置
├── commitlint.config.js # Commitlint 配置
└── package.json        # 项目配置和依赖
```

## 开发流程

### 1. 克隆项目

```bash
git clone https://github.com/masonjs-cn/ms-utils.git
cd ms-utils
```

### 2. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 开发新功能

#### 3.1 创建功能文件

根据功能类型，将文件放在对应的目录：

- **验证器函数** → `src/validator/` 目录
- **工具函数** → `src/func/` 目录
- **常量** → `src/constant/` 目录

#### 3.2 编写代码

```typescript
// src/func/example.ts
/**
 * 功能描述
 * @param {string} param - 参数描述
 * @returns {string} 返回值描述
 */
export function example(param: string): string {
  // 实现代码
  return param;
}
```

**代码规范要求：**

- 使用 TypeScript 编写，提供完整的类型定义
- 添加 JSDoc 注释，描述函数用途、参数和返回值
- 遵循项目代码风格（ESLint + Prettier）
- 函数应该是纯函数（尽可能避免副作用）

#### 3.3 编写测试

在 `src/__test__/` 目录下创建对应的测试文件：

```typescript
// src/__test__/example.test.ts
import { example } from '../func/example';

describe('example', () => {
  it('should work correctly', () => {
    expect(example('test')).toBe('test');
  });
});
```

**测试要求：**

- 测试覆盖率 ≥ 70%
- 覆盖正常情况和边界情况
- 使用描述性的测试用例名称

#### 3.4 导出函数

在 `src/index.ts` 中导出新函数：

```typescript
export { example } from './func/example';
```

### 4. 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试并查看覆盖率
pnpm run coveralls

# 监听模式运行测试
pnpm test --watch

# 运行特定测试文件
pnpm test example.test.ts
```

### 5. 代码检查

```bash
# 运行 ESLint 检查
pnpm run lint

# 自动修复 ESLint 问题
pnpm run lint -- --fix

# 检查代码格式
pnpm run prettier

# 自动格式化代码
pnpm run prettier -- --write
```

### 6. 构建项目

```bash
pnpm run build
```

构建完成后，会在 `lib/` 目录生成以下文件：

- `index.cjs.js` - CommonJS 格式
- `index.esm.js` - ES Module 格式
- `index.umd.js` - UMD 格式（已压缩）
- `index.d.ts` - TypeScript 类型定义文件

## 代码规范

### TypeScript 规范

- 使用严格的 TypeScript 配置 (`strict: true`)
- 为所有函数参数和返回值提供明确的类型
- 避免使用 `any` 类型，优先使用 `unknown`
- 使用接口定义对象类型

### 命名规范

- **函数**: 使用驼峰命名（camelCase），动词开头
  - 示例: `getValue`, `isEmail`, `formatBytes`
- **常量**: 使用大写下划线命名（UPPER_SNAKE_CASE）
  - 示例: `REGEXP_EMAIL`, `VALUE_TYPE`
- **类型/接口**: 使用帕斯卡命名（PascalCase）
  - 示例: `ValueType`, `UserInfo`

### 注释规范

```typescript
/**
 * 函数功能描述
 * 
 * @param {Type} param - 参数说明
 * @param {Type} [optionalParam] - 可选参数说明
 * @returns {Type} 返回值说明
 * 
 * @example
 * ```typescript
 * const result = example('test');
 * console.log(result); // 'test'
 * ```
 */
export function example(param: string, optionalParam?: number): string {
  // 实现代码
}
```

## Git 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构代码
- `test`: 测试相关
- `build`: 构建系统或外部依赖变更
- `chore`: 其他变更（不修改 src 或 test）
- `pref`: 性能优化

### 示例

```bash
# 新功能
git commit -m "feat: 添加 formatCurrency 函数"

# 修复 bug
git commit -m "fix: 修复 isEmail 验证逻辑错误"

# 文档更新
git commit -m "docs: 更新 README 使用示例"

# 重构
git commit -m "refactor: 优化 deepClone 性能"
```

提交前会自动运行：
- ESLint 检查
- Prettier 格式化
- Commitlint 检查提交信息格式

## 调试

### 使用 VS Code 调试

1. 在 VS Code 中打开项目
2. 创建 `.vscode/launch.json`（如果不存在）:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: 当前文件",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["${relativeFile}", "--no-coverage"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

3. 在代码中设置断点
4. 按 F5 启动调试

## 常见问题

### Q: 如何添加新的验证器函数？

A: 
1. 在 `src/validator/` 目录创建文件（如 `isXXX.ts`）
2. 实现验证逻辑
3. 在 `src/index.ts` 中导出
4. 编写测试文件
5. 运行测试确保通过

### Q: 如何添加新的工具函数？

A: 
1. 在 `src/func/` 目录创建文件
2. 实现功能逻辑
3. 在 `src/index.ts` 中导出
4. 编写测试文件
5. 运行测试确保通过

### Q: 测试失败怎么办？

A: 
1. 检查错误信息，定位问题
2. 运行 `pnpm test --verbose` 查看详细输出
3. 检查测试用例是否合理
4. 检查代码实现是否正确

### Q: 构建失败怎么办？

A: 
1. 检查 TypeScript 类型错误: `pnpm run build`
2. 检查是否有语法错误
3. 清理构建缓存: 删除 `lib/` 目录后重新构建
4. 检查 `rollup.config.js` 配置是否正确

## 下一步

- 查看 [贡献指南](./contributing.md) 了解如何提交 Pull Request
- 查看 [发布流程](./release.md) 了解如何发布新版本
- 查看 [API 文档](./api.md) 了解所有可用函数
