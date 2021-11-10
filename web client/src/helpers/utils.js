// my guardPipeline helper function.
const  guardPipeline = (guards,auth) => {
    if(guards && guards.length > 0) {
      return guards.every(guard => guard(auth))
    }else {
        return true
    }
}


const getError = (error) => {
  if(process.env.NODE_ENV === 'development') {
    console.log(error)
  }
}

export {
    guardPipeline,
    getError
};