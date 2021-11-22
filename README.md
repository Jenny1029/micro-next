微前端脚手架 micro-next-cli，基于 qiankun 快速搭建一个微前端工程，也可以基于现有项目进行微前端改造。同时还支持基座可以远程调试子应用。

## 搭建微前端基座

```
micro-next-cli init [app-name]
```

[app-name]为基座项目名称，执行此命令后会在命令行中提示您搭建的基座技术栈，根据您的需要进行选择，React 项目是基于 create-react-app 搭建的，Vue 项目是基于 vue-cli 进行搭建

## 搭建微前端子应用

```
micro-next-cli sub [app-name]
```

## 现有项目微前端化

为了避免脚手架创建的微前端文件对您的项目有原有逻辑影响，使用了各技术栈对应的项目工具对项目的入口文件改为我为您创建的文件。您可以根据文件示例加入您的原有工程逻辑中。

### 基座

```
micro-next-cli basic-micro
```

### 子应用

```
micro-next-cli sub-micro
```
