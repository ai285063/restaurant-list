# Restaurant List

### 網站操作請前往[這裡](https://enigmatic-meadow-00496.herokuapp.com/)

![demo](https://github.com/ai285063/restaurant-list/blob/master/demo-screenshots/demo.png)
![login](https://github.com/ai285063/restaurant-list/blob/master/demo-screenshots/login.png)

## Environment SetUp - 環境建置
Node.js 14.17.0
MongoDB: v4.2.13

## Installing - 專案安裝流程
1. 打開終端機(terminal)，Clone 此專案至本機電腦
```shell
git clone https://github.com/ai285063/restaurant-list.git
```
2. 開啟終端機(Terminal)，進入存放此專案的資料夾
```shell
cd restaurant-list
```
3. 安裝 npm 套件
```shell
npm install
```
4. 連線至本機 mongodb

5. 參考`.env.example`檔新增`.env`檔並修改成自己的參數

6. 在終端機輸入以下指令新增種子資料
```shell
npm run seed
```
7. 執行檔案
```shell
npm run dev
```
8. 當終端機出現以下字樣，表示伺服器與資料庫已啟動並成功連結，就可以打開 `http://localhost:3000` 查看畫面了～
```
App is running on http://localhost:3000
```
7. 欲關閉伺服器時，在終端機輸入 `ctrl` + `c`
