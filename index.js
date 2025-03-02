function myReduce(array, callback, initialValue) {
  let index = initialValue == undefined ? 1 : 0;
  let acc = initialValue ?? array[0]; 
  for (; index < array.length; index++) {
    acc = callback(acc, array[index], index, array);
  }
  return acc;
}

function minMaxValue(array) {
  const res = myReduce(array, (acc, curr) => {
    acc[0] = acc[0] > curr ? curr : acc[0];
    acc[1] = acc[1] < curr ? curr : acc[1];
    return [acc[0],acc[1]];
  }, [array[0], array[0]]);
  return res;
}

const scripts = [
  `minMaxValue([155, 2000, 0, -10, 1])`,
  `minMaxValue([1, -10, 0, 2000, 155])`,
  `minMaxValue(["kukareku", "TelRan", "str", "60", "JavaScript"])`,
  `minMaxValue(["JavaScript", "60", "str", "TelRan", "kukareku"])`,
  `minMaxValue(["JavaScript", "str", "TelRan", "kukareku"])`,
]

const expectedResults = [
  [-10,2000],
  [-10,2000],
  ["60","str"],
  ["60","str"],
  ["60","str"],
]

const createTestObjArr = (arr1, arr2) => {
  const arr3 = arr1.concat(arr2);
  let res = [];
  for (let i = 0; i < arr3.length/2; i++) {
    res[i] = {script: arr3[i], expected: arr3[arr3.length/2+i]}
  }
  return res;
}

const objArr = createTestObjArr(scripts, expectedResults);

function test(testObjArr){
  const testResult = [];
  for (let i = 0; i < testObjArr.length; i++) {
    const expectedJSON = JSON.stringify(testObjArr[i].expected);
    let evalRes;
    try {
      evalRes = eval(testObjArr[i].script);
    } catch (error) {
      evalRes = error;
    }
    const actualJSON = JSON.stringify(evalRes);
    const result = expectedJSON === actualJSON ? "passed" : "failed";
    testResult[i] = createTestResult(
      testObjArr[i].script,
      expectedJSON,
      actualJSON,
      result
    );
  }
  return testResult;
}

function createTestResult(script, expectedJSON, actualJSON, result) {
  return {script, expectedJSON, actualJSON, result};
}

function testFramework(testResult) {
  const bodyElement = document.querySelector('body');
  bodyElement.innerHTML = orderedList(test(testResult));
}

function orderedList(objArr) {
  const arr = objArr.map ((e)=> `script: ${e.script}; expected: ${e.expectedJSON}; result: ${e.result}`)
  const items = arr.map(function (e) {
        let res = (e = `<li class="item ${ e.endsWith(`passed`) ? "item_passed" : "item_failed"}">${e}</li>`);
        return res;
      });
const result = items.join('');
return `<ol>${result}</ol>`;
}

testFramework(objArr);