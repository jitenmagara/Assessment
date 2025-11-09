export const getItem = (key) => {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
};

export const setItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Generate numeric id
export const generateId = () => Date.now() + Math.floor(Math.random() * 1e6);

// make sure each entry has id
export const ensureIds = (arr) => {
    let changed = false;
    const withIds = (arr || []).map(f => {
        if (f && typeof f.id === "number" && Number.isFinite(f.id)) return f;
        changed = true;
        return { ...f, id: generateId() };
    });
    return { data: withIds, changed };
};
