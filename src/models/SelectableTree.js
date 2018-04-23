import * as ObjectUtils from '../utils/ObjectUtils';


const DEFAULT_SELECTION_VALUE = 0;
/**
 * 可选择树
 *
 * 本类建模一个树形数据结构，该类每个实例代表一棵树 ：
 * 1. 该类实例本身代表根节点;
 * 2. 该类通过公开属性 depth 表示树的深度;
 * 3. 每个节点，包括根节点和非根节点带有数组属性 children ,表示所拥有的直接子节点 (children 可以不存在，如果 children 不存在，表示整棵树表示一个一维数组);
 * 4. 某个节点的直接子节点属性数组 children 不存在或者为[]时表示该节点为叶子节点;
 * 5. 该类的直接子节点称为树的第一层节点;
 * 6. 通过该类的方法 select(level,node) 可以选择某一层上的某个节点，但是在选择N层节点时，必须保证L(L<N)层的节点已经被选择
 * 7. 树节点的数据类型可以是一个基本数据类型(通常为字符串),或者这样结构的一个对象 {key:'110100',value:'北京市',children:[]}
 *
 *
 * 其他注意事项 :
 *  1. 该类对象的任何属性对外部只能只读使用，外部修改直接修改会导致该类对象内部数据不一致的错误,比如 : depth 属性，和某个节点的 children[] 属性
 *  2. 请使用该类对象提供的方法操作该对象
 */
export default class SelectableTree {
    /**
     *
     * @param depth 树的深度，0表示空数据,1表示列表数据，2表示二级深度树
     * @param data 数组形式保存的树节点数据,每个元素的结构为类似 {key:'x',value:'y',children:[]} 的对象或者string
     * @param keyValueElement 如果叶节点数据元素为{key:'index',value:'1'}对象形式，设置为true;如果叶节点数据元素为基本数据类型，则为false
     */
    constructor(depth, children, initialSelectedPathValue) {
        this.depth = depth <= 0 ? 0 : depth;
        this.children = (children ? children : []);

        // 初始化分支选择信息
        const _initialSelectedPathValue = !ObjectUtils.isUndefinedOrNull(initialSelectedPathValue) ? initialSelectedPathValue : DEFAULT_SELECTION_VALUE;
        this._selectedPathIndexes = this._newArrayOfSize(this.depth, _initialSelectedPathValue);
        this._initialSelectedPathValue = _initialSelectedPathValue;
        this._selectedPathNodes = this._newArrayOfSize(this.depth, null);

        // 同步 _selectedPathIndexes 和 _selectedPathNodes 的脏标志, 初始化为 true
        this._dirtyFlagNeedSyncSelectedPathNodes = true;
    }

    /**
     * 检查这是否是一个空树
     * @returns {boolean}
     */
    isEmpty() {
        if (this.depth <= 0)
            return true;

        if (!ObjectUtils.isArray(this.children))
            return true;

        if (this.children.length < 1)
            return true;

        return false;
    }

    _newArrayOfSize(depth, initialValue) {
        const path = new Array(depth);//分支选择情况
        for (let i = 0; i < path.length; i++) {
            path[i] = initialValue;
        }
        return path;
    }

    /**
     * 获取树上被选择的路径，每个元素保存的是节点在当前层次节点数组中的索引
     * @returns {*}
     */
    getSelectedPathIndexes() {
        return ObjectUtils.copyArray(this._selectedPathIndexes);
    }

    /**
     * 外部指定选择路径
     * @param pathNodeIndexes
     */
    selectPath(pathNodeIndexes) {
        if (!ObjectUtils.isArray(pathNodeIndexes))
            return;

        this._dirtyFlagNeedSyncSelectedPathNodes = true;

        this.resetSelection(0);
        const depth = Math.min(this._selectedPathIndexes.length, pathNodeIndexes.length);
        for (let level = 0; level < depth; level++) {
            const target = pathNodeIndexes[level];
            if (ObjectUtils.isNumber(target)) this._selectedPathIndexes[level] = target;
        }
    }

    /**
     * 选择节点，
     * @param level 节点所在层次,0表示第一层
     * @param targetNode 待选节点或者待选节点在所在层次节点数组中的索引
     */
    select(level, targetNode) {
        if (level < 0 || level > this.depth)
            return;

        if (ObjectUtils.isUndefinedOrNull(targetNode))
            return;

        // targetNode 是数字，理解成节点索引
        if (ObjectUtils.isNumber(targetNode)) {
            this._selectByNodeIndex(level, targetNode);
            return;
        }
        else {  // 待选节点 targetNode 不是数字，理解成节点对象
            this._selectByNodeObject(level, targetNode);
        }
    }

    /**
     * 根据索引的选择
     * @param level
     * @param selectedNodeIndex
     * @private
     */
    _selectByNodeIndex(level, selectedNodeIndex) {
        this._dirtyFlagNeedSyncSelectedPathNodes = true;

        this._selectedPathIndexes[level] = selectedNodeIndex;
        this.resetSelection(level + 1);
    }

    /**
     * 根据节点对象的选择
     * @param level
     * @param node
     * @private
     */
    _selectByNodeObject(level, node) {
        if (level === 0) {
            const index = this._indexOfNode(this.children, node);
            this._selectByNodeIndex(level, index);
            return;
        }

        const selectedPathNodes = this.getSelectedPathNodes();
        const parentNode = selectedPathNodes[level - 1];
        if (!parentNode)
            return;

        const theArray = parentNode.children;
        const index = this._indexOfNode(theArray, node);

        this._selectByNodeIndex(level, index);
    }


    _indexOfNode(nodeArray, targetNode) {
        for (let i = 0; i < nodeArray.length; i++) {
            const candidate = nodeArray[i];
            const match = targetNode.key ? (targetNode.key === candidate.key) : (targetNode === candidate);
            if (match)
                return i;
        }

        return this._initialSelectedPathValue;
    }

    /**
     * 复位选择路径
     * @param startLevel 复位指定层级往下的选择路径
     */
    resetSelection(startLevel) {
        const iStart = !ObjectUtils.isUndefinedOrNull(startLevel) ? startLevel : 0;
        for (let i = iStart; i < this._selectedPathIndexes.length; i++) {
            this._selectedPathIndexes[i] = this._initialSelectedPathValue;
        }
    }

    pushChild(childNode) {
        childNode && this.children.push(childNode);
    }

    /**
     * 将缓存记录的 selectedPathNodes 数组跟 selectedIndexes 数组同步
     * @returns {*}
     * @private
     */
    _syncSelectedPathNodes() {
        if (!this._dirtyFlagNeedSyncSelectedPathNodes)
        // 从上次设置后脏同步标识已经被该同步方法设置为false,所以不需要同步
            return;
        this._dirtyFlagNeedSyncSelectedPathNodes = false;//将脏同步标识设置为false

        // 重置
        for (let level = 0; level < this.depth; level++) {
            this._selectedPathNodes[level] = null;
        }

        // 同步
        let currentLevelItems = this.children;
        for (let currentLevel = 0; currentLevel < this.depth; currentLevel++) {
            const currentLevelSelected = this._selectedPathIndexes[currentLevel];
            if (currentLevelSelected < 0 || currentLevelSelected >= currentLevelItems.length) {
                return;
            }
            this._selectedPathNodes[currentLevel] = currentLevelItems[currentLevelSelected];
            currentLevelItems = this._selectedPathNodes[currentLevel].children;
            if (!currentLevelItems)
                return;
        }

    }

    /**
     * 获取所选择的路径上的节点对象
     * @returns {*}
     */
    getSelectedPathNodes() {
        // 同步
        this._syncSelectedPathNodes();

        // 返回同步后的结果的复制品
        return ObjectUtils.copyArray(this._selectedPathNodes);
    }

    /**
     * 获取所选择的路径上的对象，不带节点的子节点数组
     */
    getSelectedPathNodesWithoutChildren() {
        const pathNodes = this.getSelectedPathNodes();
        const pathNodesWithoutChildren = pathNodes.map((node) => {
            if (node) {
                if (node.key)
                    return {key: node.key, value: node.value}
                return node;
            }

            return null;
        });
        return pathNodesWithoutChildren;
    }

    /**
     * 获取所选择的路径上的节点的 value 数组
     */
    getSelectedPathValues() {
        const pathNodes = this.getSelectedPathNodes();
        const pathNodeValues = pathNodes.map((node) => {
            if (node) {
                if (node.value)
                    return node.value;
                return node;
            }

            return null;
        });
        return pathNodeValues;
    }

    /**
     * 获取所选择的路径上的节点的 key 数组
     */
    getSelectedPathKeys() {
        const pathNodes = this.getSelectedPathNodes();
        const pathNodeKeys = pathNodes.map((node) => {
            if (node) {
                if (node.key)
                    return node.key;
                return node;
            }

            return null;
        });
        return pathNodeKeys;
    }
};