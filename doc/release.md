# 发布流程

本文档描述如何发布新版本的 `@masonjs/utils`。

## 发布前检查

### 1. 确保所有测试通过

```bash
pnpm test
pnpm run coveralls
```

确保测试覆盖率 ≥ 70%。

### 2. 代码检查

```bash
pnpm run lint
pnpm run prettier
```

确保没有代码风格问题。

### 3. 构建成功

```bash
pnpm run build
```

确保构建成功，检查 `lib/` 目录下的输出文件。

### 4. 更新版本号

根据 [语义化版本](https://semver.org/) 规范更新版本号：

- **主版本号（MAJOR）**: 不兼容的 API 修改
- **次版本号（MINOR）**: 向下兼容的功能性新增
- **修订号（PATCH）**: 向下兼容的问题修正

在 `package.json` 中更新 `version` 字段：

```json
{
  "version": "0.1.0"
}
```

### 5. 更新 CHANGELOG（如果有）

如果项目维护 CHANGELOG，请更新记录本次发布的变更。

## 发布步骤

### 方式一：使用 npm publish（推荐）

#### 1. 登录 npm

```bash
npm login
```

确保您有发布权限（需要是包的维护者）。

#### 2. 检查发布配置

确认 `package.json` 中的发布配置：

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  },
  "files": [
    "lib"
  ]
}
```

#### 3. 构建项目

```bash
pnpm run build
```

#### 4. 发布

```bash
# 使用项目中的 pub 脚本（已包含 --access public）
pnpm run pub

# 或直接使用 npm
npm publish --access public
```

#### 5. 验证发布

发布后，可以在 npm 上查看：

```bash
npm view @masonjs/utils
```

或在浏览器访问：https://www.npmjs.com/package/@masonjs/utils

### 方式二：使用 np（推荐用于正式发布）

[np](https://github.com/sindresorhus/np) 是一个交互式的发布工具，可以自动化发布流程。

#### 1. 安装 np

```bash
npm install -g np
```

#### 2. 运行 np

```bash
np
```

`np` 会：
- 运行测试
- 检查代码
- 构建项目
- 更新版本号
- 创建 Git tag
- 发布到 npm
- 推送到 Git

## Git 标签

发布新版本后，建议创建 Git 标签：

```bash
# 创建标签
git tag -a v0.1.0 -m "Release version 0.1.0"

# 推送标签
git push origin v0.1.0
```

## 发布检查清单

发布前请确认：

- [ ] 所有测试通过
- [ ] 代码检查通过
- [ ] 构建成功
- [ ] 版本号已更新
- [ ] CHANGELOG 已更新（如果有）
- [ ] README 已更新（如果有重大变更）
- [ ] 已登录 npm
- [ ] 有发布权限

## 版本发布策略

### 开发版本（开发中）

使用 `0.x.x` 版本号：

```json
{
  "version": "0.1.0"
}
```

### 稳定版本

当 API 稳定后，可以发布 `1.0.0` 版本。

### 预发布版本

在正式发布前可以发布预发布版本：

```bash
# 预发布版本示例
1.0.0-alpha.1
1.0.0-beta.1
1.0.0-rc.1
```

```bash
npm publish --tag alpha
npm publish --tag beta
npm publish --tag rc
```

安装预发布版本：

```bash
npm install @masonjs/utils@alpha
npm install @masonjs/utils@beta
```

## 回滚发布

如果发布出现问题，可以撤销发布：

### 1. 撤销 npm 发布（24 小时内）

```bash
npm unpublish @masonjs/utils@0.1.0
```

**注意**: npm 政策限制，发布 72 小时后无法删除包。

### 2. 发布修复版本

如果无法删除，可以发布一个新的修复版本：

```bash
# 更新版本号
# 修复问题
# 重新发布
npm publish
```

## 发布到其他注册表

### 发布到 GitHub Packages

1. 配置 `package.json`:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

2. 配置 `.npmrc`:

```
@masonjs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

3. 发布:

```bash
npm publish
```

## 自动化发布（CI/CD）

可以考虑使用 GitHub Actions 等 CI/CD 工具自动化发布流程。

示例 `.github/workflows/publish.yml`:

```yaml
name: Publish

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 常见问题

### Q: 发布时提示 "You do not have permission to publish"

A: 确保：
1. 已使用 `npm login` 登录
2. 您是包的维护者（需要联系包所有者添加权限）
3. 包名正确

### Q: 如何更新已发布的版本？

A: 
1. 修复问题
2. 更新版本号（PATCH 版本）
3. 重新构建和发布

### Q: 可以删除已发布的版本吗？

A: 
- 发布 24 小时内可以删除: `npm unpublish`
- 发布 72 小时后无法删除（npm 政策）
- 可以发布新的修复版本替代

### Q: 如何发布预发布版本？

A: 

```bash
# 更新版本号为预发布版本，如 1.0.0-alpha.1
# 然后发布时指定 tag
npm publish --tag alpha
```

---

**注意**: 发布前请仔细检查，确保代码质量。一旦发布，修改会影响所有使用者。
