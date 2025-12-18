# ms-utils
![npm](https://img.shields.io/npm/v/@masonjs/utils)

前端工具库,封装前端日常开发过程中的通用代码

## 如何使用

下载npm包（浏览器中使用请看下面）

`yarn add @masonjs/utils` 或者 `npm install @masonjs/utils`


### 使用ESModule规范导入
```js
import { sum } from '@masonjs/utils';
console.log(sum(1,2,3,4)) // 输出10
```

### 使用CommonJS规范导入
```js
const { sum } = require('@masonjs/utils')
console.log(sum(1,2,3,4))
```
### 在浏览器中使用
如果直接在浏览器中使用，则不需要包管理。直接下载的index.umd.js,使用的是umd通用模块规范

然后在浏览器中引用
```html
<script src="index.umd.js"></script>
<script>
    console.log(MS_utils.sum(1,2,3,4)) // 输出10
</script>
```