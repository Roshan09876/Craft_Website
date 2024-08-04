import React, { useEffect } from 'react'

const Products = () => {

  const data = ['A', 'B', 'C']
  // const data2 = [1, 2, 3, 4, 5]
  const out = []

  useEffect(() => {
    // for (let j = 0; j < data2.length; j++) {
    //   for (let index = 0; index < data.length; index++) {
    //     console.log(data[index], data2[j]);
    //   }
    // }
    for (let i = 0; i < data.length; i++) {
      out[i] = [];
      console.log(i)
      for(let j=0; j<data.length; j++){
        out[i][j] = data[i]
        console.log(i)
      }
    }

  })

  return (
    <div className='px-10 py-10'>
      <h1 className='font-extrabold text-3xl'>Products We Sell are....</h1>
      <div>
      </div>
    </div>
  )
}

export default Products
