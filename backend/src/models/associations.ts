import { User } from './User';
import { Booking } from './Booking';
import { Room } from './Room';
import { Branch } from './Branch';

// Define associations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Room.hasMany(Booking, { foreignKey: 'room_id' });
Booking.belongsTo(Room, { foreignKey: 'room_id' });

Branch.hasMany(Booking, { foreignKey: 'branch_id' });
Booking.belongsTo(Branch, { foreignKey: 'branch_id' });

Branch.hasMany(Room, { foreignKey: 'branch_id' });
Room.belongsTo(Branch, { foreignKey: 'branch_id' });

Branch.hasMany(User, { foreignKey: 'branch_id' });
User.belongsTo(Branch, { foreignKey: 'branch_id' });
