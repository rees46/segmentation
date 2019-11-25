# Segmentation
JS segmentation library for split tests with white label support

### Features

- Assigns a visitor to one of the specified segments
- The maximum number of segments is 26, like the letters in the Latin alphabet from A to Z
- A visitor's belonging to a segment can be specified and can last for a session or a specified number of days
- Sending visitor segment value to Google Analytics

### Files
- `segmentator.js` is a complete JavaScript ES6 script, easy to modify according to your needs
- `segmentator.min.js` is a minified JavaScript ES5 version of the full version for easy use

### Parameters
##### Number of segments
- integer (from 2 to 26)
- default: 2

##### Segment name (for Google Analytics)
- string
- default: "dimension1"
- If empty, the segment value isn't sent to Google Analytics

##### Whitelabel prefix
- string
- default: "rees46"

##### Cookie's lifetime (days)
- integer
- default: 0 (during the session)

### Usage

For example, three segments with the prefix "myprefix" were defined. And the segmentation script itself is connected to the "head" as a file.

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="js/segmentator.min.js"></script>
    </head>
    <body>
        ...
    </body>
</html>
```
The segment value, in this case, will be in the variable `window.myprefix_segments.segment`.
```javascript
switch(window.myprefix_segments.segment) {
    case 'A':
        // something for the segment "A" visitors
        break;
    case 'B':
        // something for the segment "B" visitors
        break;
    case 'C':
        // something for the segment "C" visitors
        break;
    default:
        // if the segment value has been reset
}
```
