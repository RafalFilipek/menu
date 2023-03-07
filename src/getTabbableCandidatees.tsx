export function getTabbableCandidatees(container: HTMLElement) {
    const nodes: HTMLElement[] = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node: HTMLElement) {
            return node.tabIndex >= 0
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT;
        },
    });
    while (walker.nextNode()) {
        // @ts-expect-error node parameter is to generic
        nodes.push(walker.currentNode);
    }
    return nodes;
}
