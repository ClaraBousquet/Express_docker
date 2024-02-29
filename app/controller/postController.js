const Post = require('../model/postScheme');

// Méthode pour afficher la page d'accueil
exports.showHome = async (req, res) => {
  try {
    //  On récupère l'id de l'utilisateur connecté
    const userId = req.user._id;

    //  On récupère tous les posts de l'utilisateur connecté
    const userPosts = await Post.find({ author: userId }).sort({ created_at: 'desc' });

    //  On renvois la vue accueil avec les posts de l'utilisateur connecté
    res.render('accueil', { userPosts });

  } catch (error) {
    console.log(error);
  }
};

// Méthode pour afficher le formulaire de création de post
exports.showAddPost = (req, res) => {
  res.render('post/add', { error: null });
};

// Méthode pour ajouter un post
exports.addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    //  On récupère l'id de l'utilisateur connecté
    const author = req.user._id;

    //  On crée l'objet post
    const newPost = new Post({
      title: title,
      content: content,
      author: author,
      created_at: new Date(),
    });

    // On sauvegarde le postm
    await newPost.save();

    // On redirige l'utilisateur vers la page d'accueil
    res.redirect('/');
  } catch (error) {
    // On redirige sur le formulaire de création de post avec un message d'erreur
    res.render('post/add', { error: 'Une erreur est survenue, veuillez réessayer.' })
  }
};

// Méthode pour afficher le formulaire de modification de post
exports.showEditPost = async (req, res) => {
  try {
    // On récupère l'id du post
    const postId = req.params.id;

    // On récupère les données du post grace à son id
    const post = await Post.findById(postId);

    // On vérifie si l'utilisateur est l'auteur du post
    if(post.author.equals(req.user._id)){
      // On renvois la vue de modification de post avec les données du post
      res.render('post/edit', { post });
    }else{
      res.redirect('/');
    }
  } catch (error) {
    res.render('post/edit', { error: 'Une erreur est survenue, veuillez réessayer.' });
  }
};

// Méthode qui met à jour un post
exports.editPost = async(req, res) => {
    try {
        // On recupère les données du formulaire
        const {title, content} = req.body;
        // On recupère l'id du post
        const postId = req.params.id;
        // On récupère le post grace à son id
        const post = await Post.findById(postId);

        // On vérifie que l'utilisateur est l'auteur du post
        if(post.author.equals(req.user._id)){
            // On met à jour le post
            post.title = title;
            post.content = content;
            post.updated_at = new Date();
            // On sauvegarde le post
            await post.save();
            // On redirige l'utilisateur vers la page d'accueil
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    } catch (error) {
        // On retourne le formulaire avec un message d'erreur
        res.render('post/edit', { error: 'Une erreur est survenue, veuillez réessayer.' });
    }
}

// Méthode pour supprimer un post

exports.deletePost = async (req, res) => {
    try {
        // On récupère l'id du post
        const postId = req.params.id;

        // On récupère le post 
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).send('Arrête de jouer avec les urls');
        }
        // On vérifie que l'utilisateur est l'auteur du post
        if(post.author.equals(req.user._id)){
            // On supprime le post
            await post.deleteOne();
            // On redirige l'utilisateur vers la page d'accueil
            res.redirect('/');
        }else{
            res.redirect('/');
        }
        
    } catch (error) {
        
    }
};