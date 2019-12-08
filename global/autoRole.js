module.exports.run = async (client, user, db) => {
  
  
  let check = await db.fetch(`autoRole_${user.guild.id}`);
  if(check === null) return;
  
  user.addRole(check);
  console.log("Given Role in Guild! here: " + user.guild.name)
  
}