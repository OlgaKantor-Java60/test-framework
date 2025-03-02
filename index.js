function myReduce(array, callback, initialValue) {
  let index = initialValue == undefined ? 1 : 0;
  let acc = initialValue ?? array[0]; // now '0' = 'true'
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

let arr1 = [155, 2000, 0, -10, 1];
let arr2 = [1, -10, 0, 2000, 155];
let arr3 = ["kukareku", "TelRan", "str", "60", "JavaScript"];
let arr4 = ["JavaScript", "60", "str", "TelRan", "kukareku"];


test({script: 'minMaxValue(["hello", "kuku", "abc"])', expected: ["abc", "kuku"]});
test({script: 'minMaxValue([155, 2000, 0, -10, 1])', expected: [-10, 2000]});

const scripts = [
  `minMaxValue(${arr1})`,
  `minMaxValue(${arr2})`,
  `minMaxValue(${arr3})`,
  `minMaxValue(${arr4})`
]

const expectedResults = [
  `[-10, 2000]`,
  `[-10, 2000]`,
  `["60", "kukareku"]`,
  `["60", "kukareku"]`
]

const createTestObjArr = (arr1, arr2) => {
  const arr3 = arr1.concat(arr2);
  let res = [];
  for (let i = 0; i < arr3.length/2; i++) {
    res[i] = {script: arr3[i], expected: arr3[arr3.length/2+i]}
  }
  return res;
}

let obj = createTestObjArr(scripts, expectedResults);


function test(testObj){
  // testObj structure {
  //      script: <string containing script text>, expected: <any type>
  //      }
  // returns resultObject with structure {
  //      script: <string containing script text>, 
  //      expected JSON: <JSON string, containing expected result>, 
  //      actual JSON: <JSON string containing actual result>,
  //      result: <string containing either 'passed' or 'failed'>
  //      }

  
 const expectedJSON = JSON.stringify(testObj.expected);
  let evalRes;
  try {
      evalRes = eval(testObj.script);
  } catch (error) {
      evalRes = error;
  }
  const actualJSON = JSON.stringify(evalRes);
  const result = expectedJSON === actualJSON ? 'passed' : 'failed';
  const testResult = createTestResult(testObj.script, expectedJSON, actualJSON, result);
  return testResult;
}

function createTestResult(script, expectedJSON, actualJSON, result) {
  return {script, expectedJSON, actualJSON, result};
}

function testFramework(scripts, expectedResults) {
  //TODO
  //input
  //scripts - array of tested scripts 
  //expected result - array of appropriate results
  //scripts[i] and expectedResults[i] should be consistent
  //************** */
  //output
  const bodyElement = document.querySelector('body');
  bodyElement.innerHTML = orderedList(test(testObj));
  // bodyElement.innerHTML = <orderedList of test results with coloring legend: passed by green, failed by red>
  // after list summery including number of passed/failed tests (same coloring)
  //presenting list items on the browser
}

function orderedList(obj) {
  // const jsonObj = JSON.stringify.obj;
  // .map(function (e) {
  // let res =  e = `<li class="item ${typeof e == "number" ? "item_number" : "" }">${e}</li>`;
  //   return res;
  // });
  // const result = arr2.join(" ");
  // return `<ol>${result}</ol>`;
}