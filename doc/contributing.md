# 贡献指南

感谢您对 `@masonjs/utils` 项目的关注！我们欢迎所有形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请通过 [GitHub Issues](https://github.com/masonjs-cn/ms-utils/issues) 提交。

**提交 Issue 前请：**

1. 搜索已有的 Issue，避免重复
2. 使用清晰的标题和描述
3. 提供复现步骤（对于 bug）
4. 提供期望行为和实际行为
5. 包含环境信息（Node.js 版本、操作系统等）

### 提交代码

#### 1. Fork 项目

在 GitHub 上 Fork 本项目到您的账户。

#### 2. 克隆 Fork 的仓库

```bash
git clone https://github.com/YOUR_USERNAME/ms-utils.git
cd ms-utils
```

#### 3. 添加上游仓库

```bash
git remote add upstream https://github.com/masonjs-cn/ms-utils.git
```

#### 4. 创建功能分支

```bash
# 从 main 分支创建新分支
git checkout -b feat/your-feature-name

# 或修复 bug
git checkout -b fix/your-bug-fix
```

**分支命名规范：**

- `feat/xxx` - 新功能
- `fix/xxx` - 修复 bug
- `docs/xxx` - 文档更新
- `refactor/xxx` - 代码重构
- `test/xxx` - 测试相关
- `chore/xxx` - 其他变更

#### 5. 开发

按照 [开发指南](./development.md) 进行开发：

1. 编写代码
2. 编写测试
3. 运行测试确保通过
4. 运行代码检查

```bash
# 运行测试
pnpm test

# 代码检查
pnpm run lint

# 格式化代码
pnpm run prettier
```

#### 6. 提交更改

```bash
# 添加更改
git add .

# 提交（遵循 Conventional Commits 规范）
git commit -m "feat: 添加新功能描述"

# 推送到您的 Fork
git push origin feat/your-feature-name
```

#### 7. 创建 Pull Request

1. 在 GitHub 上打开您的 Fork
2. 点击 "New Pull Request"
3. 填写 PR 描述：
   - **标题**: 清晰描述您的更改
   - **描述**: 
     - 说明更改的原因和内容
     - 关联相关的 Issue（使用 `#issue-number`）
     - 列出主要变更点
     - 提供测试说明（如果适用）

**PR 模板示例：**

```markdown
## 描述

简要描述本次 PR 的内容

## 变更类型

- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他

## 相关 Issue

关联的 Issue: #123

## 主要变更

- 变更点 1
- 变更点 2

## 测试说明

如何测试这些更改：
1. 步骤 1
2. 步骤 2

## 检查清单

- [ ] 代码遵循项目代码规范
- [ ] 已添加必要的测试
- [ ] 测试通过且覆盖率 ≥ 70%
- [ ] 已更新相关文档
- [ ] 已添加 JSDoc 注释
- [ ] 提交信息遵循 Conventional Commits 规范
```

#### 8. 代码审查

- 维护者会审查您的 PR
- 根据反馈进行修改
- 所有审查意见解决后，PR 会被合并

## 开发规范

### 代码规范

- 遵循项目的 ESLint 和 Prettier 配置
- 使用 TypeScript 编写，提供完整类型定义
- 编写清晰的注释（JSDoc 格式）
- 保持函数简洁，单一职责

### 测试规范

- 所有新功能必须包含测试
- 测试覆盖率 ≥ 70%
- 测试用例要覆盖正常情况和边界情况
- 使用描述性的测试用例名称

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）:**

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `build`: 构建系统
- `chore`: 其他

**示例：**

```bash
feat(validator): 添加 isIPv6 验证函数
fix(calculate): 修复浮点数精度问题
docs: 更新 README 使用示例
```

## 添加新功能

### 添加新的验证器函数

1. 在 `src/validator/` 目录创建文件，如 `isIPv6.ts`:

```typescript
/**
 * 验证是否为 IPv6 地址
 * @param {string} value - 待验证的值
 * @returns {boolean} 是否为 IPv6 地址
 * 
 * @example
 * ```typescript
 * isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 * isIPv6('192.168.1.1') // false
 * ```
 */
export function isIPv6(value: string): boolean {
  // 实现逻辑
}
```

2. 在 `src/index.ts` 中导出:

```typescript
export { isIPv6 } from './validator/isIPv6';
```

3. 编写测试 `src/__test__/isIPv6.test.ts`:

```typescript
import { isIPv6 } from '../validator/isIPv6';

describe('isIPv6', () => {
  it('should return true for valid IPv6', () => {
    expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
  });

  it('should return false for invalid IPv6', () => {
    expect(isIPv6('192.168.1.1')).toBe(false);
  });
});
```

### 添加新的工具函数

类似验证器函数，在 `src/func/` 目录创建文件并实现。

## 行为准则

请遵循以下行为准则：

- **尊重**: 尊重所有贡献者，无论经验水平
- **包容**: 欢迎不同观点和经验
- **建设性**: 提供建设性的反馈和建议
- **专业**: 保持专业和礼貌的沟通

## 获得帮助

如果您在贡献过程中遇到问题：

1. 查看 [开发指南](./development.md)
2. 查看 [API 文档](./api.md)
3. 在 GitHub Issues 中搜索相关问题
4. 创建新的 Issue 描述您的问题

## 许可证

通过贡献代码，您同意您的贡献将在 [MIT License](../License) 下授权。

---

再次感谢您的贡献！🙏
