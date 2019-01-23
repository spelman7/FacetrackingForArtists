# Face Perception (Computers)

![alt text](images/how-computers-see-faces.jpg)

Let's turn to the other side of face perception: computers. We'll look at the most fundamental processes for working with faces in code, and we'll try to build a little intuition around how we might design our own projects.

---

### How the algorithms work

Computers 'see' faces in three broad categories: Detection, Tracking, and Recognition.

Detection is about determining whether or not a face exists in a given image.

Tracking refers to the task of monitoring a face's position and features over a set of images.

Recognition is the process of matching the identity or specific characteristics of a face to a database of faces.

#### Detection

The common standard for face detection is the [Viola-Jones / Haar Cascase algorithm](https://en.wikipedia.org/wiki/Viola%E2%80%93Jones_object_detection_framework). It was first proposed in 2001, although it's fairly processing-intensive, so it took a few years before consumer hardware was able to handle it.

[Here's a good video](https://vimeo.com/12774628) from Adam Harvey that explains how it works.

[![harvey haar](images/harvey-haar.png)](https://vimeo.com/12774628)

The algorithm is trained by using a huge database of images, some containing faces (positive examples) and some without (negative examples). The positive examples also come with metadeta that shows where a set of facial keypoints resides in the image's pixel coordinates.

In the training stage, each image is analyzed for a huge set of 'features'. These features are tiny little chunks of the image, and they basically look to see if the image in a particular region matches their light/dark pattern. If it does, it gets a high value. If it doesn't, it gets a low value.

![alt text](images/haar-1.jpeg)

![alt text](images/algorithm-2.jpeg)

These weights are then structured in a decision tree based on the size of their features and the correlation between the feature and positive examples.

After the training stage, this decision tree is applied to an image. If it matches certain decision boundaries for large features/regions, then smaller and smaller ones are applied until the algorithm can confidently make a decision (or not) about the location of a face in the image.

It's all about tiny light and dark regions, which creates a number of problems. Lighting and skin tone variations are hard for the algorithm to deal with. Same goes for face orientation - it's generally trained on vertical images. Good implementations of the algorithm try to account for these issues.

#### Tracking

To find out how a face is positioned, what expression it's making, and how it's changed from previous frames/images, you need to do more than detection. This is where tracking comes in.

A common technique for this tracking step is called [Active Shape Modeling](https://en.wikipedia.org/wiki/Active_shape_model) ([Active Appearance Modeling](https://en.wikipedia.org/wiki/Active_appearance_model) takes it a step further).

These algorithms have a pre-built 3D model (vertices and triangles) that they're trying to best-fit to the image of the face. Here's an image of what that model looks like:

![alt text](images/algorithm-4.jpeg)

This algorithm is nuanced and can be implemented elegantly or not, but it basically works like this:
1. Based on Haar detection, an initial guess is made about the location of features the system is 'most confident' about.
2. An interative loop runs, trying to fit a model to guessed keypoints in the image
  1. Each image keypoint is adjusted slightly based on initial confidences
  2. Keypoints from the facial model are adjusted slightly to move toward their corresponding points in image space

![ASM AAM Fitting](images/asm-1.gif)

The following image shows how features extracted from the Haar cascade are used to make guesses about the model's keypoints.

![alt text](images/algorithm-1.jpeg)

Different implementations of the model fitting algorithm have varying levels of 'stickiness'. You want an implementation that won't get stuck in a local maximum for shape-fitting, but will snap back to the expecte behavior easily. In working with these systems, you'll often find it getting stuck in an orientation that isn't what you'd expect. You might have to move your face slightly to get the model to 'snap' to it's ground truth.

![alt text](images/algorithm-3.jpeg)

#### Recognition

This is an image taken from a [patent that Apple filed in 2007](https://www.iphoneincanada.ca/apple/apple-patents-facial-recognition-technology-for-idevices-and-macs/), detailing a proposal for how a facial identification system would work on a user's device. 11 years later, we got FaceID.

![Apple Recognition](images/apple-recognition.png)

![iPhoneX Infrared](images/iphone-x.png)

The frontier of facial recognition tech is consistently creeping people out. Probably for good reason.

This is a difficult thing to mess around with yourselves as it involves running facial images against models which are very proprietary and often protected (again, for good reason).

China has been publicly shaming people for small crimes by matching images of their faces drawn from CCTV cameras to the government's databases. [It's been wrong a few times in funny but scary ways](https://gizmodo.com/facial-recognition-flags-woman-on-bus-ad-for-jaywalking-1830654750).

There's a fair amount of debate around whether or not faces are a reasonable key/login - [people have been able to hack such systems pretty easily](https://www.wired.com/2016/08/hackers-trick-facial-recognition-logins-photos-facebook-thanks-zuck/).

Here's a [crazy demo of recognizing faces from corneal reflections](https://io9.gizmodo.com/hidden-faces-can-be-found-by-zooming-into-hi-res-photos-1491607189).

---

### What the algorithms give you

#### Vertices

![brfv4 vertices](images/brfv4-vertices.jpg)

![Text](images/visage-keypoints.png)

![Text](images/visage-vertices.png)

#### Orientation (Position/Rotation)

![Text](images/pose.jpeg)

![Text](images/visage-orientation.png)

#### Expression

Chernoff Faces

![Text](images/chernoff-faces.png)

Facial Action Coding System

![Text](images/visage-aus.png)
---

### Works:

Lauren McCarthy & Kyle McDonald, [How We Act Together](https://hwat.schirn.de/)

[![How We Act Together](images/mcarthy-how.png)](https://hwat.schirn.de/)

--

Zach Lieberman & R. Luke Dubois, [Face Values](https://www.instagram.com/p/BnUYy-2gSO3/) (2018)

[![Face Values](images/lieberman-values.png)](https://www.instagram.com/p/BnUYy-2gSO3/)

--

Adam Harvey, [MegaPixels: Faces](https://ahprojects.com/megapixels-glassroom/) (2017)

[![Text](images/harvey-megapixels.jpg)](https://ahprojects.com/megapixels-glassroom/)

--

Andy Clymer [font-face](https://vimeo.com/26188365) (2012)

[![Text](images/clymer-font.png)](https://vimeo.com/26188365)

--

[Google Arts & Culture App](https://itunes.apple.com/us/app/google-arts-culture/id1050970557?mt=8) (2017)

[![Text](images/google-app.jpg)](https://itunes.apple.com/us/app/google-arts-culture/id1050970557?mt=8)

--

[Nvidia AI-Generated Human Faces](https://arxiv.org/pdf/1812.04948.pdf) (2018)

[![Text](images/nvidia-faces.jpg)]()

--

Memo Atken, [Optimizing for Beauty](http://www.memo.tv/portfolio/optimising-for-beauty/) (2017)

[![Text](images/atken-beauty.png)](http://www.memo.tv/portfolio/optimising-for-beauty/)

--

Ziv Schneider, [Facing the Nameless](https://zivschneider.com/Facing-the-Nameless) (2015)

[![Text](images/schneider-facing.gif)](https://zivschneider.com/Facing-the-Nameless)

--

Heather Dewey-Hagborg, [Stranger Visions](http://deweyhagborg.com/projects/stranger-visions) (2011)

[![Text](images/dewey-cox-stranger-1.jpg)](http://deweyhagborg.com/projects/stranger-visions)
[![Text](images/dewey-cox-stranger-2.jpg)](http://deweyhagborg.com/projects/stranger-visions)

--

Matthias Dorfelt, [Weird Faces](https://www.mokafolio.de/works/Weird-Faces) (2012)

[![Text](images/dorfelt-weird.jpg)](https://www.mokafolio.de/works/Weird-Faces)

--

Adam Harvey, [CVDazzle](https://cvdazzle.com/) (2010)

[![Text](images/harvey-cv.png)](https://cvdazzle.com/)

--

Jill Magid, [Evidence Locker](http://www.jillmagid.com/projects/evidence-locker-2) (2004)

[![Text](images/magid-evidence.jpg)](http://www.jillmagid.com/projects/evidence-locker-2)

--

Kyle McDonald, [People Staring At Computers](https://vimeo.com/25958231) (2011) ([follow-up](https://www.wired.com/2012/07/people-staring-at-computers/))

[![Text](images/mcdonald-people.png)](https://vimeo.com/25958231)

--

Jon Rafman, [9 Eyes](http://9-eyes.com/) (2009)

[![Text](images/rafman-9.jpg)](http://9-eyes.com/)
