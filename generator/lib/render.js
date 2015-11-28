var renderers = {
    webshot: require('./renderer/webshot')
};

function render(instruction) {
    var render = renderers[instruction.renderer.type];

    if (render) {
        return render(instruction);
    }

    return Promise.reject({
        error: 'No renderer found',
        instruction: instruction
    });
}

module.exports = render;