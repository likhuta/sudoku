module.exports = function solveSudoku(matrix) {

  let simpleMatrix = convertToSimpleArray(matrix);
  console.log('simpleMatrix', simpleMatrix)
 function convertToSimpleArray(array){
      let res=[];
      for (let i=0; i<array.length; i++)
          if (!Array.isArray(array[i]))
              res.push(array[i]);
          else{
            res=res.concat(convertToSimpleArray(array[i]));
            console.log(res)
          }
      return res;
  };
  function check(possibleNumber, row, col) {
      for (let i = 0; i < 9; i++) {
          let x = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
          if (possibleNumber === simpleMatrix[(row * 9) + i] ||
              possibleNumber === simpleMatrix[col + (i * 9)] ||
              possibleNumber === simpleMatrix[x]) {
               return false;
          }
      }
      return true;
  }

  function getNumber(index) {
      if (index >= simpleMatrix.length) {
          return true;
      } else if (simpleMatrix[index] !== 0) {
          return getNumber(index + 1);
      }
      for (let i = 1; i <= 9; i++) {
          if (check(i, Math.floor(index / 9), index % 9)) {
            simpleMatrix[index] = i;
              if (getNumber(index + 1)) {
                return true;
              }
          }
      }
      simpleMatrix[index] = 0;
        return false;
  }

  function makeBigArr(arr) {
      let result = [];
      for (let i = 0; i < arr.length; i += 9) {
          result.push(arr.slice(i, i + 9));
      }
      return result;
  }


  if (getNumber(0)) return makeBigArr(simpleMatrix);
  };
