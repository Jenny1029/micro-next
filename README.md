微前端脚手架 micro-next-cli，基于 [qiankun](https://qiankun.umijs.org/zh/guide) 快速搭建一个微前端工程，也可以基于现有项目进行微前端改造，同时还支持基座可以远程调试子应用。

## 初始化一个新的微前端工程

[app-name]为基座项目名称，执行此命令后会在命令行中提示您搭建的基座技术栈，根据您的需要进行选择，React 项目是基于 create-react-app 搭建的，Vue 项目是基于 vue-cli 进行搭建

### 微前端基座

```
micro-next-cli basic [app-name]
```

### 搭建微前端子应用

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

## 搭建我的微前端工程体系

你是不是还有懵圈，微前端体系到底是什么样子的，什么是基座，什么是子应用，那么就跟着我来试试吧

> - 使用 `micro-next-cli basic [app-name]`命令创建一个微前端基座，项目中已经为您注册了两个不同技术栈的微前端子应用（注册子应用列表配置的的端口号和各子应用项目端口号一致，否则项目将无法运行），并执行对应的 scripts 命令 run 起来工程
> - 使用 `micro-next-cli sub [app-name]`命令分别创建两个不同技术栈的微前端子应用，并在项目工程下 run 起来
> - 打开基座工程的端口号，如果您没有修改端口，react 默认是 3000，vue 默认是 8081

![我的微前端示例图片](https://pic1.58cdn.com.cn/nowater/cxnomark/n_v2270152896c9244929712a3da2f1b018c.png)

## 现有工程下项目微前端化

和从 0-1 搭建微前端项目不一样的是，我想在现有工程下改造我的微前端应用。

> - 那您就需要确定工程的基座项目，在基座项目目录下执行`micro-next-cli basic-micro`
> - 在子应用项目目录下执行 `micro-next-cli sub-micro`
> - 同上面一样，都需要将各项目工程运行起来

![现有微前端项目改造实例图片](https://pic1.58cdn.com.cn/nowater/cxnomark/n_v2bb56202e5e434b0292d9eb40e39f149e.png)
