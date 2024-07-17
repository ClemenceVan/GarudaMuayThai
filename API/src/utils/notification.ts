/* Models*/
import Notification, { INotification } from '../models/notification';

/* Constants */
import {
    string, updated, badRequest, notFound, notification as notificationStr, success
} from '../constants/routes';


export const NotificationUtils = {
    create: async (title: string, description: string, userIds: Array<string>) => {
        const notification = await new Notification({
            title,
            description,
            userIds,
            url: "",
            seen: false
        }).save()
        return { notificationId: notification._id, url: "" };
    },
    delete: async (notificationId: string) => {
        const notif = await Promise.all([
            Notification.findOne({ _id: notificationId })
        ]);
        if (notif[0] === null) return false;
        Notification.findOneAndRemove({ _id: notificationId }).exec();
        return true;
    },
    get: async (userId: string, limit: string, skip: string) => {
        const notifs = await Promise.all([
            Notification.find({ userIds: userId }).limit(parseInt(limit)).skip(parseInt(skip)).exec()
        ]);
        return notifs[0];
    },
    patch: async (notificationsId: Array<string>) => {
        const notifs = await Notification.find().where('_id').in(notificationsId).exec();
        if (notifs.length === 0 || notifs[0] === null)
            return false;
        await notifs.forEach(async (notif: any) => {
            notif.seen = true;
            await notif.save();
        });
        console.log("patch");
        return notifs;
    }
}