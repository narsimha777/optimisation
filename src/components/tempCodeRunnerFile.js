 for(let i=0;i<result.length;i++)
    {
      let curr = result[i];
      for(let j=0;j<result.length-1;j++)
      {
       this.rotate(curr);
       result.splice(result.indexOf(curr),1);
      }
    }