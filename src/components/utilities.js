
const util = {
  rotate(arr) {
    let toun = arr.pop();
    arr.unshift(toun);
  },
  get_routes(len) {
    let inputarr = [];
    for (let i = 0; i < len; i++) {
      inputarr.push(i);
    }
    let result = [];
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          if (m.indexOf(next[0]) === -1) {
            permute(curr.slice(), m.concat(next));
          }
        }
      }
    }
    permute(inputarr);
    for (let i = 0; i < result.length; i++) {
      let curr = result[i].slice();
      for (let j = 0; j < curr.length; j++) {
        this.rotate(curr);
        if (result.indexOf(curr) !== i) {
          result.splice(result.indexOf(curr), 1);
        }
      }
      let rev = curr.slice().reverse();
      for (let j = 0; j < rev.length - 1; j++) {
        this.rotate(rev);
        if (result.indexOf(rev) !== i) {
          result.splice(result.indexOf(rev), 1);
        }
      }
    }
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < i; j++) {
        this.rotate(result[i]);
      }
    }
    for (let i = 0; i < result.length; i++) {
      let curr = result[i][0];
      result[i].push(curr);
    }
    return result;
  },
  // getroutedis(dist,routes){
  //   let len = routes.length;
  //   let routedis=new Array(len).fill(0);
  //   for(let i=0;i<len;i++)
  //   {
  //     for(let j=1;j<routes[i].length;j++)
  //     {
  //       routedis[i]+=dist[routes[i][j-1]][routes[i][j]];
  //     }
  //   }
  //   return routedis;
  // },
  // getphermone(routedis){
  //   let len = routedis.length;
  //   let pherm = new Array(len).fill();
  //   for(let i=0;i<len;i++)
  //   {
  //     pherm[i] = 4/routedis[i];
  //   }
  //   return pherm;
  // },
  getprobabilty(arr, s, dist, pheromone, alpha, beta) {
    let result = new Array(dist.length).fill(0);
    for (let i = 0; i < arr.length; i++) {
      result[arr[i]] = 4 / dist[s][arr[i]];
    }
    result = result.map((ele, ind) => (Math.pow(ele, alpha) * Math.pow(pheromone[s][ind], beta)));
    let sum = result.reduce((accumulator, currentvalue) => accumulator + currentvalue, 0);
    result = result.map((ele)=>ele/sum);
    return result;
  },
  getfinalpheromone(dist, nofant, nofit, alpha, beta, evaprate) {
    let n = dist.length;
    let prob;
    let pheromone = new Array(n).fill().map(() => new Array(n).fill(0.5));
    let availvertices = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      availvertices[i] = i;
    }
    for (let a = 0; a < nofit; a++) {
      let oneit = new Array(nofant).fill().map(() => new Array(n).fill(-1));
      let distances = new Array(nofant).fill(0);
      for (let k = 0; k < nofant; k++) {
        let curravail = availvertices.slice();
        oneit[k][0] = k % n;
        curravail.splice(k % n, 1);
        for (let i = 1; i < n; i++) {
          prob = this.getprobabilty(curravail, oneit[k][i - 1], dist, pheromone, alpha, beta);
          let max = Math.max(...prob);
          let maxind = prob.indexOf(max);
          distances[k] += dist[oneit[k][i - 1]][maxind];
          oneit[k][i] = maxind;
          let actualmaxind = curravail.indexOf(maxind);
          curravail.splice(actualmaxind, 1);
        }
      }
      for (let i = 0; i < pheromone.length; i++) {
        pheromone[i].map((ele) => ele * evaprate);
      }
      for (let k = 0; k < nofant; k++) {
        for (let i = 1; i < n; i++) {
          pheromone[oneit[k][i - 1]][oneit[k][i]] += (4) / distances[k];
        }
      }
    }
    return pheromone;
  },
  getfinalroute(s, dist, nofant, nofit, alpha, beta, evaprate) {
    let n = dist.length;
    let pheromone = this.getfinalpheromone(dist, nofant, nofit, alpha, beta, evaprate);
    let route = [];
    route.push(s);
    let curravail = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      curravail[i] = i;
    }
    curravail.splice(s,1);
    for (let i = 1; i < n; i++) {
          let prob = this.getprobabilty(curravail, route[i - 1], dist, pheromone, alpha, beta);
          console.log("prob:"+prob);
          let max = Math.max(...prob);
          let maxind = prob.indexOf(max);
          route.push(maxind);
          let actualmaxind = curravail.indexOf(maxind);
          curravail.splice(actualmaxind, 1);
        }
    return route;
  }
};

// let dis = [[0, 2, 3, 4], [2, 0, 4, 5], [3, 4, 0, 9], [6, 5, 9, 0]];
// let arr = [1, 2, 3];
// let pheromone = [[0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]]
// let route = util.get_routes(4);
// let routedis = util.getroutedis(dis,route)
// console.log(route);
// console.log(util.getroutedis(dis,route));
// console.log(util.getphermone(routedis));
// console.log(util.getfinalpheromone(dis, 4, 2, 10, 10, 0.32));
// let route = util.getfinalroute(3,dis, 12, 40, 10, 30, 0.5)
// console.log(route);

export default util;