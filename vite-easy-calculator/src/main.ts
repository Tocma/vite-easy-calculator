// 計算ボタンの要素を取得
const calculateButton = document.getElementById("calculate") as HTMLButtonElement;

// 結果の要素を取得
const resultSpan = document.getElementById("result") as HTMLSpanElement;

// 履歴削除ボタンの要素を取得
const historyClearButton = document.getElementById("clear_history") as HTMLButtonElement;

// 計算履歴を表示するためのリスト<ul>を取得
const historyList = document.getElementById("history") as HTMLUListElement;
let historyNumber = 1;

// 計算ボタンをクリックしたときのイベント
calculateButton.addEventListener("click", calculate);
// Enterキーをクリックしたときのイベント
document.addEventListener("keydown",handleKeyDown);
// 履歴削除ボタンをクリックしたときのイベント
historyClearButton.addEventListener("click",historyClear);

// 計算イベントの定義
function calculate(): void {

  // 数値1の値を取得し小数点付きの数値に変換
  let firstInput = document.getElementById("first-input") as HTMLInputElement;
  let firstNumber = parseFloat(firstInput.value);

  // 数値2の値を取得し小数点付きの数値に変換
  let secondInput = document.getElementById("second-input") as HTMLInputElement;
  let secondNumber = parseFloat(secondInput.value);

  // セレクトボックスの要素を取得
  const selectElement = document.getElementById("operator") as HTMLSelectElement;

  // 選択された符号の要素を取得
  const option = selectElement.options[selectElement.selectedIndex] as HTMLOptionElement;
  // 選択された符号のvalue値を取得
  const sign = option.value;

  // 数値1と数値2の計算結果を表す変数を定義
  let result: number | string;

  // 数値1と数値2が数値であるかそうでないかで処理結果を変更
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    result = "数値を入力してください。";
  } else {
    switch (sign) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber == 0) {
          result = "エラー";
        } else{
        result = firstNumber / secondNumber;
        }
        break;
      default:
        result = "数値を入力してください。";
        break;
    }
  }
  resultSpan.textContent = result.toString();

  // 計算するごとに<li>を作成し<ul>へ追加
  const historyItem = document.createElement("li");
  historyItem.innerHTML = "履歴" + historyNumber + ": " + firstNumber + sign + secondNumber + "=" + result;
  historyList.appendChild(historyItem);
  historyNumber++;
}

//Enterキークリック時もcalculateを実行できるよう定義
function handleKeyDown(event:KeyboardEvent) :void{
  if(event.key === "Enter"){
    calculate();
  }
}

// 履歴削除イベントの定義
function historyClear():void{
  historyList.innerHTML = "";
  historyNumber = 1;
}



