//waifu-tips.js:包含了按钮和对话框的逻辑
//waifu-tips.json :定义了触发条件（selector，CSS 选择器）和触发时显示的文字（text）；
//waifu.css:看板娘的样式表。可以对看板娘的位置布局等做自定义修改

// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "https://fastly.jsdelivr.net/gh/shendongjun/live2d-widget@1.1.0/"; //这个是github的cdn镜像
// const live2d_path = "https://npm.elemecdn.com/shendongjun-live2dwidget@latest/"; //这个是element镜像
// const live2d_path = "/live2d-widget/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource(live2d_path + "live2d.min.js", "js"),
		loadExternalResource(live2d_path + "waifu-tips.js", "js")
	]).then(() => {
		initWidget({
			waifuPath: live2d_path + "waifu-tips.json",
			// 这里是live2d的后端api设置，没有api是显示不出模型的哦~ （api是后端服务即已经部署过的后端服务，可以通过Vercel部署，自行百度即可，其实挺简单；cdn则是npm的cdn地址；）
			// apiPath: "https://live2d.fghrsh.net/api/",
			cdnPath: "https://npm.elemecdn.com/akilar-live2dapi@latest/"
			// cdnPath: "https://npm.elemecdn.com/akilar-live2dapi@1.0.6/" //用指定版本饿了么好像是有问题的，建议用latest
			// cdnPath: "https://npm.elemecdn.com/shendongjun-live2dapi@latest/"
		});
	});
}
// initWidget 第一个参数为 waifu-tips.json 的路径，第二个参数为 API 地址
// API 后端可自行搭建，参考 https://github.com/fghrsh/live2d_api
// 初始化看板娘会自动加载指定目录下的 waifu-tips.json
console.log("看板娘加载出来喽！")
console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);
