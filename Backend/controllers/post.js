

//Ajout d'un post
exports.createPost = (req, res, next) => {
    res.status(201).json({ message: 'Create Post'})
}


//Récupération d'un post
exports.getOnePost = (req, res, next) => {
    res.status(200).json({ message: 'getOnePost' })
}

//Modification d'un post

/* Si j'ai envie
exports.modifyPost = (req, res, next) => {
    res.status(201).json({ message: 'modifyPost' })
}
*/

//Suppression d'un post
exports.deletePost = (req, res, next) => {
    res.status(200).json({ message: 'deletePost' })
}
//Récupération des Posts
exports.getAllPost = (req, res, next) => {
    res.status(200).json({ message: 'GetAllPost' })
}