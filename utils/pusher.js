import Pusher from 'pusher-js';

const pusher = new Pusher(config.PUSHER_APP_KEY, {
    cluster: config.PUSHER_APP_CLUSTER,
});

export default pusher;