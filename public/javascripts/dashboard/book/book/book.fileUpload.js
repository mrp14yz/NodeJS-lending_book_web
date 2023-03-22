FilePond.registerPlugin(
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateType
)

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150,
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