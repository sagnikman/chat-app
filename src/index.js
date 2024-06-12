const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { ConnectMongoDB } = require('./utils/common');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { app, server } = require('./socket/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRoutes);

PORT = ServerConfig.PORT || 3000;

app.use(express.static(path.join(path.resolve(), 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'client', 'dist', 'index.html'));
});

server.listen(PORT, () => {
    ConnectMongoDB.connectToMongoDB();
    console.log(`Successfully started the server on PORT : ${PORT}`);
});
