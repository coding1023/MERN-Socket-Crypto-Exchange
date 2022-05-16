const {getCrypto, setCrypto, updateCrypto, deleteCrypto} = require ('../controllers/cryptoController')
const router = require ('express').Router();



router.get('/', getCrypto)


router.post('/exchange', setCrypto)

router.put('/:id', updateCrypto)

router.delete('/:id', deleteCrypto);


module.exports = router;