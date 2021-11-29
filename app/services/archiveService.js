const {Board, Task} = require("../models/index");

class ArchiveService {
    async getArchive(id) {
        const dbBoard = await Board.findByPk(id, {
            include: [
                {
                    model: Task,
                    where: {
                        board_id: id,
                        archive: true,
                    },
                },
            ],
        });

        const archivedTasks = dbBoard.Tasks.map(task => task.get({plain: true}));

        return {
            idBoard: dbBoard.dataValues.id,
            nameBoard: dbBoard.dataValues.title,
            tasks: archivedTasks,
        };
    }

    async setArchive(data) {
        const updateTask = await Task.update({
            archive: !data.archive,
        }, {
            where: {id: data.id},
        });
        const archiveTask = await Task.findOne({where: {id: data.id}});
        return archiveTask;
    }
}

module.exports = new ArchiveService();