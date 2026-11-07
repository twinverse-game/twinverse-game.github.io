import{c as e}from"./index-DdRnmvTn.js";import{n as t,t as n}from"./fogFragment-Br227GBc.js";import{n as r,r as i,t as a}from"./logDepthFragment-DVpyMeEE.js";import{t as o}from"./helperFunctions-B5kKIPPH.js";import{t as s}from"./logDepthDeclaration-DCUeUNeH.js";var c=`imageProcessingCompatibility`,l=`#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;e.IncludesShadersStore[c]||(e.IncludesShadersStore[c]=l);var u={name:c,shader:l},d=`geometryRenderingFragment`,f=`#ifdef PREPASS
#if SCENE_MRT_COUNT>0
float geometryCoverage=geometryColor.a>0.4 ? 1.0 : 0.0;
#ifdef PREPASS_COLOR
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_COLOR_INDEX,geometryColor);
#endif
#ifdef PREPASS_POSITION
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_POSITION_INDEX,vec4(geometryPositionW,geometryCoverage));
#endif
#ifdef PREPASS_LOCAL_POSITION
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_LOCAL_POSITION_INDEX,vec4(geometryPositionL,geometryCoverage));
#endif
#ifdef PREPASS_DEPTH
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_DEPTH_INDEX,vec4(geometryViewDepth,0.0,0.0,geometryCoverage));
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_NORMALIZED_VIEW_DEPTH_INDEX,vec4(geometryNormalizedViewDepth,0.0,0.0,geometryCoverage));
#endif
#ifdef PREPASS_SCREENSPACE_DEPTH
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_SCREENSPACE_DEPTH_INDEX,vec4(gl_FragCoord.z,0.0,0.0,geometryCoverage));
#endif
#ifdef PREPASS_NORMAL
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_NORMAL_INDEX,vec4(geometryNormalV,geometryCoverage));
#endif
#ifdef PREPASS_WORLD_NORMAL
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_WORLD_NORMAL_INDEX,vec4(geometryNormalW*0.5+0.5,geometryCoverage));
#endif
#ifdef PREPASS_ALBEDO
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_ALBEDO_INDEX,vec4(geometryAlbedo,geometryCoverage));
#endif
#ifdef PREPASS_ALBEDO_SQRT
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_ALBEDO_SQRT_INDEX,vec4(sqrt(max(geometryAlbedo,vec3(0.0))),geometryCoverage));
#endif
#ifdef PREPASS_REFLECTIVITY
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_REFLECTIVITY_INDEX,vec4(0.0,0.0,0.0,geometryCoverage));
#endif
#ifdef PREPASS_IRRADIANCE
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_IRRADIANCE_INDEX,vec4(0.0,0.0,0.0,geometryCoverage));
#endif
#ifdef PREPASS_IRRADIANCE_LEGACY
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_IRRADIANCE_LEGACY_INDEX,vec4(0.0));
#endif
#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)
#ifdef PREPASS_VELOCITY_ZERO
vec2 geometryMotion=vec2(0.0);
#else
vec2 geometryMotion=0.5*(geometryCurrentPosition.xy/geometryCurrentPosition.w-geometryPreviousPosition.xy/geometryPreviousPosition.w);
#endif
#ifdef PREPASS_VELOCITY
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_VELOCITY_INDEX,vec4(pow(abs(geometryMotion),vec2(1.0/3.0))*sign(geometryMotion)*0.5+0.5,0.0,geometryCoverage));
#endif
#ifdef PREPASS_VELOCITY_LINEAR
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_VELOCITY_LINEAR_INDEX,vec4(-geometryMotion,0.0,geometryCoverage));
#endif
#endif
#ifdef PREPASS_OBJECT_ID
WRITE_GEOMETRY_FRAGMENT_OUTPUT(PREPASS_OBJECT_ID_INDEX,encodeObjectId(objectId)*geometryCoverage);
#endif
#ifdef PREPASS_MESH_BLEND_TAG
meshBlendTagOutput=geometryCoverage>0.0 ? uvec4(uint(meshBlendTag),0u,0u,0u) : uvec4(0u);
#endif
#endif
#endif
`;e.IncludesShadersStore[d]||(e.IncludesShadersStore[d]=f);var p={name:d,shader:f},m=`spritesPixelShader`,h=`#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
uniform bool alphaTest;varying vec4 vColor;
#ifdef PREPASS
uniform float geometryZeroAlphaDiscard;
#ifdef PREPASS_POSITION
varying vec3 vPositionW;
#endif
#ifdef PREPASS_NORMAL
varying vec3 vNormalV;
#endif
#ifdef PREPASS_WORLD_NORMAL
varying vec3 vNormalW;
#endif
#endif
varying vec2 vUV;uniform sampler2D diffuseSampler;
#include<fogFragmentDeclaration>
#include<logDepthDeclaration>
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
#ifdef PIXEL_PERFECT
vec2 uvPixelPerfect(vec2 uv) {vec2 res=vec2(textureSize(diffuseSampler,0));uv=uv*res;vec2 seam=floor(uv+0.5);uv=seam+clamp((uv-seam)/fwidth(uv),-0.5,0.5);return uv/res;}
#endif
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#ifdef PIXEL_PERFECT
vec2 uv=uvPixelPerfect(vUV);
#else
vec2 uv=vUV;
#endif
vec4 color=texture2D(diffuseSampler,uv);float fAlphaTest=float(alphaTest);if (fAlphaTest != 0.)
{if (color.a<0.95)
discard;}
color*=vColor;
#ifdef PREPASS
#if defined(PREPASS_ALBEDO) || defined(PREPASS_ALBEDO_SQRT)
vec3 geometryAlbedo=toLinearSpace(color.rgb);
#endif
if (fAlphaTest==0.0 && color.a==0.0 && geometryZeroAlphaDiscard>0.0) {discard;}
#endif
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#ifdef PREPASS
vec4 geometryColor=gl_FragColor;
#ifdef PREPASS_POSITION
vec3 geometryPositionW=vPositionW;
#endif
#ifdef PREPASS_LOCAL_POSITION
vec3 geometryPositionL=vPosition;
#endif
#ifdef PREPASS_DEPTH
float geometryViewDepth=vViewPos.z;
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
float geometryNormalizedViewDepth=vNormViewDepth;
#endif
#ifdef PREPASS_NORMAL
vec3 geometryNormalV=vNormalV;
#endif
#ifdef PREPASS_WORLD_NORMAL
vec3 geometryNormalW=vNormalW;
#endif
#if defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)
vec4 geometryCurrentPosition=vCurrentPosition;vec4 geometryPreviousPosition=vPreviousPosition;
#endif
#include<geometryRenderingFragment>
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}`;e.ShadersStore[m]||(e.ShadersStore[m]=h);var g=[i,r,t,s,o,a,n,u,p];for(let t of g)e.IncludesShadersStore[t.name]||(e.IncludesShadersStore[t.name]=t.shader);var _={name:m,shader:h};export{_ as spritesPixelShader};