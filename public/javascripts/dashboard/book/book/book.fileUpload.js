FilePond.registerPlugin(
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateType
)

FilePond.setOptions({
    stylePanelAspectRatio: 450 / 300,
    imageResizeTargetWidth: 300,
    imageResizeTargetHeight: 450,
})

const inputElement = document.querySelector('input[type="file"]')
const pond = FilePond.create(inputElement, {
    storeAsFile: true,
    acceptedFileTypes: ['image/png', 'image/jpeg'],
    fileValidateTypeDetectType: (source, type) =>
        new Promise((resolve, reject) => {
            const imageMimeTypes = ['image/jpeg', 'image/png']
            if(imageMimeTypes.includes(type)){
                resolve(type)
            }else reject(pond.removeFile())
    }),
})