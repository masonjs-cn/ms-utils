# @masonjs/utils

![npm](https://img.shields.io/npm/v/@masonjs/utils)
![license](https://img.shields.io/npm/l/@masonjs/utils)
![downloads](https://img.shields.io/npm/dm/@masonjs/utils)

一个轻量级、类型安全的前端工具函数库，封装前端日常开发过程中的通用代码，支持 TypeScript，提供完善的类型定义。

## ✨ 特性

- 📦 **轻量级** - 按需引入，体积小
- 🎯 **TypeScript** - 完整的 TypeScript 类型定义，支持类型导出
- 🚀 **多格式支持** - 支持 ESM、CommonJS、UMD 多种模块规范
- ✅ **完善的测试** - 高测试覆盖率（≥70%），保证代码质量
- 🔧 **零依赖** - 不依赖其他第三方库
- 📚 **文档完善** - 详细的 API 文档和使用示例
- 🛡️ **类型安全** - 使用泛型约束，减少 `any` 类型使用
- 🔍 **错误处理** - 关键函数提供输入验证和清晰的错误信息
- 🎨 **代码规范** - 统一的代码风格和完整的 JSDoc 注释

## 📦 安装

```bash
# 使用 npm
npm install @masonjs/utils

# 使用 yarn
yarn add @masonjs/utils

# 使用 pnpm
pnpm add @masonjs/utils
```

## 🚀 快速开始

### ES Module

```typescript
import { sum, debounce, throttle, isEmail, formatBytes, deepClone } from '@masonjs/utils';

// 数学计算
console.log(sum(1, 2, 3, 4)); // 输出: 10

// 验证器
console.log(isEmail('test@example.com')); // 输出: true

// 格式化
console.log(formatBytes(1024)); // 输出: '1 KB'

// 深拷贝
const obj = { a: 1, b: { c: 2 } };
const cloned = deepClone(obj);

// 防抖和节流
const debouncedFn = debounce(() => console.log('debounced'), 300);
const throttledFn = throttle(() => console.log('throttled'), 1000);
```

### CommonJS

```javascript
const { sum, isEmail } = require('@masonjs/utils');

console.log(sum(1, 2, 3, 4)); // 输出: 10
console.log(isEmail('test@example.com')); // 输出: true
```

### 浏览器（UMD）

```html
<script src="https://unpkg.com/@masonjs/utils/lib/index.umd.js"></script>
<script>
  console.log(MS_utils.sum(1, 2, 3, 4)); // 输出: 10
  console.log(MS_utils.isEmail('test@example.com')); // 输出: true
  console.log(MS_utils.formatBytes(1024)); // 输出: '1 KB'
</script>
```

### 按需导入（Tree-shaking 优化）

为了获得更好的 tree-shaking 效果，减少打包体积，你可以按需导入特定模块：

```typescript
// 方式1: 从主入口导入（支持 tree-shaking）
import { isEmail, debounce } from '@masonjs/utils';

// 方式2: 按需导入特定模块（更好的 tree-shaking）
import { isEmail } from '@masonjs/utils/validator';
import { debounce } from '@masonjs/utils/func';

// 方式3: 命名空间导入
import * as Validator from '@masonjs/utils/validator';
import * as Func from '@masonjs/utils/func';

// 使用命名空间
console.log(Validator.isEmail('test@example.com')); // true
const debouncedFn = Func.debounce(() => console.log('debounced'), 300);
```

**推荐使用方式2**，可以获得最佳的 tree-shaking 效果，只打包你实际使用的代码。

## 💡 使用示例

### 表单验证

```typescript
import { isEmail, isPhone, isIdCard, isEmpty } from '@masonjs/utils';

// 邮箱验证
if (!isEmail(userInput)) {
  console.error('请输入有效的邮箱地址');
}

// 手机号验证
if (!isPhone(userInput)) {
  console.error('请输入有效的手机号');
}

// 身份证验证
if (!isIdCard(userInput)) {
  console.error('请输入有效的身份证号');
}

// 空值检查
if (isEmpty(formData)) {
  console.error('表单数据不能为空');
}
```

### 防抖和节流

```typescript
import { debounce, throttle, ThrottleOptions } from '@masonjs/utils';

// 搜索框防抖
const handleSearch = debounce((keyword: string) => {
  console.log('搜索:', keyword);
  // 执行搜索逻辑
}, 500);

// 滚动事件节流
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
  // 执行滚动逻辑
}, 200);

// 节流选项配置
const handleResize = throttle(() => {
  console.log('窗口大小改变');
}, 300, { 
  leading: true,  // 开始时执行
  trailing: true  // 结束时执行
});
```

### 数据处理

```typescript
import { deepClone, filterNull, getKeyList, intersection } from '@masonjs/utils';

// 深拷贝
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// 过滤空值
const data = { name: 'John', age: null, email: undefined };
const cleaned = filterNull(data); // { name: 'John' }

// 提取对象数组中的键值
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Charlie' }
];
const ids = getKeyList(users, 'id'); // [1, 2] (去重)

// 数组交集
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const arr3 = [3, 4, 5];
const common = intersection(arr1, arr2, arr3); // [3]
```

### 数学计算

```typescript
import { plus, minus, times, divide, round, sum } from '@masonjs/utils';

// 精确加法（解决浮点数精度问题）
console.log(plus(0.1, 0.2)); // 0.3 (而不是 0.30000000000000004)

// 精确减法
console.log(minus(0.3, 0.1)); // 0.2

// 精确乘法
console.log(times(0.1, 0.2)); // 0.02

// 精确除法
console.log(divide(0.3, 0.1)); // 3

// 四舍五入
console.log(round(1.23456, 2)); // 1.23

// 求和
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### 格式化

```typescript
import { formatBytes, formatCommafy, formatFloat } from '@masonjs/utils';

// 字节格式化
console.log(formatBytes(1024)); // '1 KB'
console.log(formatBytes(1048576)); // '1 MB'
console.log(formatBytes(1073741824)); // '1 GB'

// 数字千分位格式化
console.log(formatCommafy(1234567.89)); // '1,234,567.89'

// 小数精度处理
console.log(formatFloat(1.23456, 2)); // 1.23
console.log(formatFloat(1.23456, 3)); // 1.235
```

### URL 处理

```typescript
import { getQueryMap, parseQueryString, stringfyQueryString } from '@masonjs/utils';

// 解析查询参数
const url = 'https://example.com?name=John&age=30';
const queryMap = getQueryMap(url);
console.log(queryMap.get('name')); // 'John'

// 解析查询字符串
const params = parseQueryString('name=John&age=30');
console.log(params); // { name: 'John', age: '30' }

// 序列化查询字符串
const queryString = stringfyQueryString({ name: 'John', age: 30 });
console.log(queryString); // 'name=John&age=30'
```

### Cookie 操作

```typescript
import { getCookie, setCookie, removeCookie } from '@masonjs/utils';

// 设置 Cookie
setCookie('username', 'John', 7); // 7 天后过期

// 获取 Cookie
const username = getCookie('username');

// 删除 Cookie
removeCookie('username');
```

### 日期处理

```typescript
import { isLeapYear, remainTime, isSameDay } from '@masonjs/utils';

// 判断是否为闰年
console.log(isLeapYear(2024)); // true

// 计算剩余时间
const endTime = new Date('2024-12-31 23:59:59');
const remain = remainTime(endTime);
console.log(remain); // { days: 365, hours: 0, minutes: 0, seconds: 0 }

// 判断是否为同一天
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-01');
console.log(isSameDay(date1, date2)); // true
```

## 📖 API 文档

### 项目架构

```
src/
├── constant/          # 常量定义
│   ├── regexp.ts     # 正则表达式常量
│   ├── types.ts      # 类型定义和枚举
│   └── variables.ts  # 变量常量
├── func/             # 工具函数
│   ├── array.ts      # 数组相关
│   ├── calculate.ts  # 数学计算
│   ├── cookie.ts     # Cookie 操作
│   ├── date.ts       # 日期处理
│   ├── debounce.ts   # 防抖
│   ├── throttle.ts   # 节流
│   └── ...          # 更多工具函数
└── validator/        # 验证器函数
    ├── isEmail.ts    # 邮箱验证
    ├── isPhone.ts    # 手机号验证
    └── ...          # 更多验证函数
```

### 功能分类

#### 🔍 验证器（Validator）

提供各种数据验证函数，包括类型判断、格式验证等。

- **类型判断**: `isArray`, `isObject`, `isString`, `isNumber`, `isBoolean`, `isFunc`, `isDate`, `isNull`, `isUndefined`, `isNaN`
- **格式验证**: `isEmail`, `isPhone`, `isMobile`, `isUrl`, `isIp`, `isIdCard`, `isPostalCode`, `isPort`, `isColor`
- **空值判断**: `isEmpty`, `isEmptyArray`, `isEmptyObject`, `isEmptyString`
- **特殊验证**: `isJSON`, `isBlob`, `isAppleDevice`, `hasClass`
- **字符串规则**: `isLetterNumber`, `isLetterNumberUnderline`, `isLetterNumberZhUnderline`

#### 🛠️ 工具函数（Utils）

提供常用的工具函数，涵盖数据处理、DOM 操作、网络请求等。

- **数组操作**: `arrayEqual`, `arrayUnique`, `intersection`
- **对象操作**: `deepClone`, `isEqual`, `isEqualObject`, `isEqualArray`, `getKeyList`, `filterNull`
- **字符串处理**: `subBefore`, `subAfter`, `getValueType`
- **数学计算**: `sum`, `strip`, `plus`, `minus`, `times`, `divide`, `round`, `digitLength`, `float2Fixed`
- **格式化**: `formatBytes`, `formatCommafy`, `formatFloat`
- **函数增强**: `debounce`, `throttle`
- **日期处理**: `isLeapYear`, `remainTime`, `isSameDay`
- **DOM 操作**: `toggleClass`, `isIncludeAllChildren`, `openLink`
- **存储**: `getCookie`, `setCookie`, `removeCookie`
- **设备检测**: `getBrowserInfo`
- **文件操作**: `downFile`, `downloadImgStream`, `convertImgStreamToBase64`
- **URL 处理**: `getQueryMap`, `isValidURL`, `parseQueryString`, `stringfyQueryString`
- **随机生成**: `randomColor`, `randomNum`, `randomPhone`, `randomName`
- **工具**: `uuid`, `sleep`

#### 📦 常量（Constants）

- **正则表达式**: `REGEXP_EMAIL`, `REGEXP_PHONE`, `REGEXP_URL`, `REGEXP_IP` 等
- **类型枚举**: `ValueType`, `PasswordStrenthENUM`, `RedirectionType`, `BooleanType`, `BuildType`
- **变量**: `EMAIL_SUFFIX_DOMAIN` 等

### 详细 API 文档

查看 [完整 API 文档](./doc/api.md) 获取所有函数的详细说明和示例。

## 🔨 开发

### 环境要求

- Node.js >= 14
- pnpm >= 7 (推荐) 或 npm/yarn

### 本地开发

```bash
# 克隆项目
git clone https://github.com/masonjs-cn/ms-utils.git
cd ms-utils

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 运行测试覆盖率
pnpm run coveralls

# 代码检查
pnpm run lint

# 代码格式化
pnpm run prettier

# 构建
pnpm run build
```

### 项目结构

```
ms-utils/
├── src/              # 源代码目录
│   ├── __test__/    # 测试文件
│   ├── constant/    # 常量定义
│   ├── func/        # 工具函数
│   └── validator/   # 验证器函数
├── lib/             # 编译输出目录（构建后生成）
├── doc/             # 文档目录
├── jest.config.mjs  # Jest 测试配置
├── rollup.config.js # Rollup 构建配置
├── tsconfig.json    # TypeScript 配置
└── package.json     # 项目配置
```

## 📝 测试

项目使用 Jest 进行单元测试，测试覆盖率要求 ≥ 70%。

```bash
# 运行所有测试
pnpm test

# 运行测试并查看覆盖率
pnpm run coveralls

# 监听模式运行测试
pnpm test --watch
```

## 🌐 浏览器兼容性

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 📄 许可证

[MIT](./License)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

请阅读 [贡献指南](./doc/contributing.md) 了解如何参与项目开发。

## 🔗 相关链接

- [GitHub](https://github.com/masonjs-cn/ms-utils)
- [npm](https://www.npmjs.com/package/@masonjs/utils)
- [问题反馈](https://github.com/masonjs-cn/ms-utils/issues)

## 📚 更多文档

- [开发指南](./doc/development.md)
- [API 文档](./doc/api.md)
- [发布流程](./doc/release.md)
- [优化建议](./doc/optimization.md)
- [更新日志](./CHANGELOG.md)

---

Made with ❤️ by [Mason](https://github.com/masonjs-cn)
