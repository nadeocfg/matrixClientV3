export interface GetTimelineJSXMessagesModel {
  join: (user: string) => string;
  leave: (user: string, reason?: string, displayName?: string) => string;
  invite: (inviter: string, user: string) => string;
  cancelInvite: (user: string) => string;
  rejectInvite: (user: string) => string;
  kick: (actor: string, user: string) => string;
  ban: (actor: string, user: string, reason: string) => string;
  unban: (actor: string, user: string) => string;
  avatarSets: (user: string) => string;
  avatarChanged: (user: string) => string;
  avatarRemoved: (user: string) => string;
  nameSets: (user: string, newName: string) => string;
  nameChanged: (user: string, newName: string) => string;
  nameRemoved: (user: string, lastName: string) => string;
}

const getTimelineJSXMessages = (): GetTimelineJSXMessagesModel => {
  return {
    join(user: string) {
      return `${user} joined the chat`;
    },
    leave(user: string, reason?: string, displayName?: string) {
      if (reason) {
        return `${user} kicked ${displayName || 'user'}`;
      }

      return `${user} left the chat`;
    },
    invite(inviter: string, user: string) {
      return `${inviter} invited ${user}`;
    },
    cancelInvite(user: string) {
      return `${user} rejected the invitation`;
    },
    rejectInvite(user: string) {
      return `${user} rejected the invitation`;
    },
    kick(actor: string, user: string) {
      return `${actor} kicked ${user}`;
    },
    ban(actor: string, user: string, reason: string) {
      const reasonMsg = typeof reason === 'string' ? `: ${reason}` : '';
      return `${actor} banned ${user}. ${reasonMsg}`;
    },
    unban(actor: string, user: string) {
      return `${actor} unbanned ${user}`;
    },
    avatarSets(user: string) {
      return `${user} set a avatar`;
    },
    avatarChanged(user: string) {
      return `${user} changed their avatar`;
    },
    avatarRemoved(user: string) {
      return `${user} removed their avatar`;
    },
    nameSets(user: string, newName: string) {
      return `${user} set display name to ${newName}`;
    },
    nameChanged(user: string, newName: string) {
      return `${user} changed their display name to ${newName}`;
    },
    nameRemoved(user: string, lastName: string) {
      return `${user} removed their display name ${lastName}`;
    },
  };
};

export default getTimelineJSXMessages;
