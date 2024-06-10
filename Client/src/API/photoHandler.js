export const uploadCoverPhoto = async(file)=>{
   try {
   const response = await fetch("/pixel-pushers/uploadCoverPhoto", {
      method: "POST",
      body:file,
      credentials: "include",
    })
    if(response.ok){
      const data = response.json()
      return data;
    }
   } catch (error) {
    console.error(error)
    console.log(error)
   }
    
}
