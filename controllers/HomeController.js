exports.index = (req, res) => {
    res.render('pages/home', {
      titulo: 'Página Inicial',
      mensagem: 'teste para ver se ta funcionado.'
    });
  };