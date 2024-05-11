
exports.checkExistTable = async (db, query) => {
    const check = await db.raw(`select exists(${query.first(1).toQuery()}) as "check"`)
    return check.rows[0].check
}