/// <reference path="./references.d.ts"/>

class VisualBase implements powerbi.IVisual {
    protected element: JQuery;
    protected container: JQuery;
    private iframe : JQuery;

    /** This is called once when the visual is initialially created */
    public init(options: powerbi.VisualInitOptions, template?: string): void {
        var width = options.viewport.width;
        var height = options.viewport.height;
        this.container = options.element;
        this.iframe = $(`<iframe style="width:${width}px;height:${height}px;border:0;margin:0;padding:0" frameBorder="0"/>`);
        this.container.append(this.iframe);
        this.element = this.iframe.contents().find("body");
        $.when(this.getExternalCssResources().map((resource) => this.buildExternalCssLink(resource)))
            .then((styles) => this.element.append(styles.map((s) => $(s))));
        this.element.append("<st" + "yle>" + this.getCss() + "</st" + "yle>");
        if (template) {
            this.element = this.element.append($(template));
        }
    }

    /**
     * Notifies the IVisual of an update (data, viewmode, size change).
     */
    public update(options: powerbi.VisualUpdateOptions) {
        this.iframe.css({ width: options.viewport.width, height: options.viewport.height });
    }

    /**
     * Gets the inline css used for this element
     */
    protected getCss() : string[] {
        return [`/*INLINE_CSS*/`];
    }

    /**
     * Builds the link for the given external css resource
     */
    protected buildExternalCssLink(resource: ExternalCssResource) : JQueryPromise<string> {
        var link = 'li' + 'nk';
        var integrity = resource.integrity ? `integrity="${resource.integrity}"` : '';
        var href = `href="${resource.url}"`;
        var crossorigin = resource.crossorigin ? ` crossorigin="${resource.crossorigin}"` : '';
        var rel = 'rel="stylesheet"';
        var defer = $.Deferred<string>();
        defer.resolve(`<${link} ${href} ${rel} ${integrity} ${crossorigin}>`);
        return defer.promise();
    }

    /**
     * Gets the external css paths used for this visualization
     */
    protected getExternalCssResources() : ExternalCssResource[] {
        return [];
    }
}

/**
 * Specifies an external css resource
 */
interface ExternalCssResource {
    /**
     * The url of the resource
     */
    url: string;

    /**
     * The integrity string of the resource
     */
    integrity?: string;

    /**
     * The cross origin of the resource
     */
    crossorigin?: string;
}
