function diff(before, after){
    //pjax/ajax to get the two models
    //before = get(model1)
    //after = get(model2)
    var model_before = new Model3D(before, scene, {active: "true", type: "before"})
    var model_after = new Model3D(before, scene, {active: "true", type: "after"})
    
    model_before.toggleDiffMode()
    model_after.toggleDiffMode()

    //TODO: Implement it fully
}