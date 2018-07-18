# 问题集中营

## 常用命令

```
"scripts": {
    "start": "gulp dev",
    "build": "gulp dist"
  },
```

1.  gulpfile.js 中

- 对样式的处理分为开发阶段与上线阶段的
  > 在开发阶段中，问题：
  > main.css 中。样式每次新添加之后，原来的样式会保留下来，大问题！
- 对 js 的处理分为开发阶段和上线阶段

* 开发阶段
  1.babel 处理失败！
  2.js 中问题很多**\***

2.  与后台打交道的 api 都封装到 src/js/service/api.js 文件中
3.  对模板的处理

```
gulp.task('tpl', function() {
  return (
    gulp
      .src('src/template/**/*.html')
      .pipe(
        tmodjs({
          templateBase: 'src/template/',
          runtime: 'tpl.js',
          compress: false
        })
      )
      .pipe(replace('var String = this.String;', 'var String = window.String;'))
      .pipe(gulp.dest('src/js/tmpl'))
  );
});
```

4.  开发阶段中对样式 style 的处理

```
/**
 * 1.scss文件进行编译css文件
 * 2.css文件和scss编译后代
 * 3.css自动添加css3前缀
 * 4.css进行压缩
 * 5.如果时开发阶段，需要增加sourcemap
 * 6.给最后的main.css文件添加版本号
 *
 * */
gulp.task('style:dev', function() {
  // console.log('处理样式问题')
  return gulp
    .src(['./src/style/**/*.{scss,css}', '!./src/style/main.css'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        // 兼容css3
        browsers: ['last 2 versions'], // 浏览器版本
        cascade: true, // 美化属性，默认true
        add: true, // 是否添加前缀，默认true
        remove: true, // 删除过时前缀，默认true
        flexbox: true // 为flexbox属性添加前缀，默认true
      })
    )
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/style'));
});
```

5.  开发阶段中对 js 的处理

```
/**
 * js**的处理
 * 1.es6进行代码的转换
 * 2.eslint。。。js代码进行格式化的校验
 * 3.ji进行压缩
 * 4.js要进行大版本号dist
 * */
gulp.task('js', function() {
  return gulp
    .src(['./src/js/**/*.js'])
    .pipe(eslint())
    .pipe(
      eslint.results(results => {
        // Called once for all ESLint results.
        console.log(`JS总校验文件: ${results.length}`);
        console.log(`JS警告个数：: ${results.warningCount}`);
        console.log(`JS错误个数: ${results.errorCount}`);
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/js/'));
});
```

6.  开发阶段对\*\*监控文件处理

```
gulp.task('dev', ['open'], function() {
  // 监控css变化并自动调用style样式生成工作流
  gulp.watch(
    ['src/style/**', '!./src/style/main.css'],
    ['style:dev'],
    function() {
      connect.reload(); // 重启服务器
    }
  );
  gulp.watch('src/template/**/*.html', ['tpl']);
});
```

7.  开发阶段对 html 的处理

```
gulp.task('html', function() {
  // 1.把html中的路径替换成打上版本后的文件名（css 和 js 两类都要做）
  // 2. 把html进行压缩处理
  return gulp
    .src(['./src/**/*.json', './src/**/*.html', '!./src/template/**']) // - 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector({ replaceReved: true })) // - 执行html文件内css文件名的替换和js文件名替换
    .pipe(
      htmlmin({
        // html压缩
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
      })
    )
    .pipe(gulp.dest('./dist/')); // - 替换后的文件输出的目录
});
```

## 上线阶段\*\*\*下面

1.  上线之后对样式的处理

```
gulp.task('style', function() {
  // console.log('处理样式问题')
  return gulp
    .src(['./src/style/**/*.{scss,css}', '!./src/style/main.css'])

    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        // 兼容css3
        browsers: ['last 2 versions'], // 浏览器版本
        cascade: true, // 美化属性，默认true
        add: true, // 是否添加前缀，默认true
        remove: true, // 删除过时前缀，默认true
        flexbox: true // 为flexbox属性添加前缀，默认true
      })
    )
    .pipe(concat('main.css'))
    .pipe(
      cleanCss({
        // 压缩css
        compatibility: 'ie8',
        // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        keepSpecialComments: '*'
      })
    )
    .pipe(rev())
    .pipe(gulp.dest('./dist/style'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('src/style'));
});
```

2.  上线之后对图片进行压缩

```
// region**对上线之后的****图片进行压缩
gulp.task('imagemin', function() {
  return gulp
    .src('src/asset/**/*.{jpg,png,gif,jpeg,ico}')
    .pipe(
      imgagemin({
        optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true,
        // 类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true // 类型：Boolean
        // 默认：false 多次优化svg直到完全优化
      })
    )
    .pipe(gulp.dest('dist/asset/'));
});
// endregion**对上线之后的图片进行压缩
```

3.  dist 任务

```
// region***项目上线前一秒钟**序列化执行gulp操作，将src目录下的全部文件按序列打包转到dist目录之内
gulp.task('dist', function() {
  runSequence('clean','tpl','copyAsset',  'imagemin', 'style', 'js', 'html', 'revjs');
});
// endregion**项目上线前一秒钟**序列化执行gulp操作
```

4.  清理

```
// region**上线之前需要做的**打包之前的清理工作
gulp.task('clean', function() {
  return gulp
    .src(['dist/js/**', 'dist/style/**'], { read: false })
    .pipe(clean({ force: true }));
});
// endregion***上线之前需要做的**打包之前的清理工作
```

```
// 给requirejs引用的文件修改版本号的路径
gulp.task('revjs', function() {
  return gulp
    .src('./dist/js/**/*.js')
    .pipe(
      configRevReplace({
        manifest: gulp.src('./src/js/rev-manifest.json')
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

// endregion****** 上线阶段阶段使用的命令*******************
```

4.  配置测试服务器

```
gulp.task('devServer', function() {
  connect.server({
    root: ['./src'], // 网站根目录
    port: 36666, // 端口
    livereload: true,
    middleware: function(connect, opt) {
      return [
        modRewrite([
          // 设置代理 /api/admin/login =>http://192.168.0.102:8080/mockjsdata/7/api/admin/login
          '^/api/(.*)$ http://192.168.0.102:8080/mockjsdata/7/api/$1 [P]'
        ])
      ];
    }
  });
});
```

5.  启动浏览器的打开地址

```
gulp.task('open', ['devServer'], function() {
  gulp.src(__filename).pipe(open({ uri: 'http://localhost:36666/index.html' }));
});
```

```
// region*** 把src对应的文件放到dist文件夹中
// src之下的asset转移到dist的对应目录之下****
gulp.task('copyAsset', function() {
  return gulp
    .src(['./src/asset/**/', './src/lib/**/'], { read: true, base: './src' })
    .pipe(gulp.dest('./dist/'));
});
// endregion
```
