const proxy = {
    'GET /api/getGridList': (req, res)=>{
        const entitylist = [];
        for (let i = 0; i < 100; i++) {
            entitylist.push({
                key: i.toString(),
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }
        return res.send(entitylist);
    },
    'GET /api/user': { id: 1, username: 'kenny', sex: 6 , text : 'this is a text from server' },
    'GET /api/user/list': [
        { id: 1, username: 'kenny', sex: 6 },
        { id: 2, username: 'kenny', sex: 6 }
    ],
    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: "sdfsdfsdfdsf",
                data: { id: 1, username: 'kenny', sex: 6 }
            });
        } else {
            return res.send({ status: 'error', code: 403 });
        }
    },
    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({ status: 'ok', message: '删除成功！' });
    }
}
module.exports = proxy;