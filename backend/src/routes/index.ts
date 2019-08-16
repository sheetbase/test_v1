import { Sheetbase } from '../index';

export default () => {

    const router = Sheetbase.Router;

    router.get('/', (req, res) => {
        return res.html(`<h1>Sheetbase Backend</h1>`);
    });

    router.post('/', (req, res) => {
        return res.success({ title: 'Sheetbase Backend' });
    });

};
