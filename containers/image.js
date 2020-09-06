const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'e33d1df69d934aa9a57b6a7492ee603b'
  });

const handleApiCall = (req, res) => { 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err =>  {
        console.log(err);
        res.status(400).json('Unable to get the entries')})
}

module.exports = {
    handleImage,
    handleApiCall
}