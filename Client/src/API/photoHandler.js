export const handlePhoto = async(dataUrl)=>{
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setLoading(true);
      fetch("/pixel-pushers/uploadProfilePhoto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profilePhoto: dataUrl }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((dataRes) => {
          setLoading(false);
          setPhoto(dataRes.profileImageUrl);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
        reader.readAsDataURL(file);
    }
}
