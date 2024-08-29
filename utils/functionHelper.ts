interface TokenInfo {
    name: string;
    address: string;
    chain: number;
  }

export const checkArrayOperation = (element: TokenInfo, array: TokenInfo[]) => {
    if (array.length == 0) {
        return ({op: true, ind: 0});
    } else {
        let op = true;
        let ind = 0;
        for (let i = 0; i < array.length; i++) {
            const element_ = array[i];
            ind = i;
            if (element == element_) {
                op = false;
            }
            
        }
        return ({op: op, ind: ind});
    }
}