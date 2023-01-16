import { IEvent, MatrixClient } from 'matrix-js-sdk';

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

const getTimelineJSXMessages = (
  event: Partial<IEvent>,
  instance: MatrixClient | null,
): string => {
  const getMessage = {
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

  if (!event.content?.membership) {
    return '';
  }

  const sender =
    instance?.getUser(event.sender || '')?.displayName ||
    event.prev_content?.displayname ||
    '';
  const senderId = event.sender;
  const target = event.state_key;
  const username =
    event.content.displayname ||
    event.prev_content?.displayname ||
    instance?.getUser(event.state_key || '')?.displayName ||
    '';
  const reason = event.content.reason;

  switch (event.content?.membership) {
    case 'join': {
      return getMessage.join(username || '');
    }

    case 'leave': {
      if (senderId === target) {
        if (event.prev_content?.membership === 'invite') {
          return getMessage.cancelInvite(sender);
        } else {
          return getMessage.leave(sender, reason, username);
        }
      }

      if (event.prev_content?.membership === 'ban') {
        return getMessage.unban(sender, username);
      }

      return getMessage.kick(sender || '', username);
    }

    case 'invite': {
      return getMessage.invite(sender, username);
    }

    case 'cancelInvite': {
      return getMessage.cancelInvite(sender);
    }

    case 'rejectInvite': {
      return getMessage.rejectInvite(username);
    }

    case 'kick': {
      return getMessage.kick(sender, username);
    }

    case 'ban': {
      return getMessage.ban(sender, username, reason);
    }

    case 'unban': {
      return getMessage.unban(sender, username);
    }

    case 'avatarSets': {
      return getMessage.avatarSets(username);
    }

    case 'avatarChanged': {
      return getMessage.avatarChanged(username);
    }

    case 'avatarRemoved': {
      return getMessage.avatarRemoved(username);
    }

    default: {
      return '';
    }
  }
};

export default getTimelineJSXMessages;
