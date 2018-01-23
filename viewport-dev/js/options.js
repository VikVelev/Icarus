$(".model").submit((value) => {
    console.log(value)
    scene.add(value)
})

let file_model = $(".model").val()
console.log(file_model)